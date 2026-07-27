import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        let reportData = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            reportData = response?.interviewReport ?? null
            setReport(reportData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return reportData
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        let reportData = null
        try {
            response = await getInterviewReportById(interviewId)
            reportData = response?.interviewReport ?? null
            setReport(reportData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return reportData
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        let reportsData = []
        try {
            response = await getAllInterviewReports()
            reportsData = response?.interviewReports ?? []
            setReports(reportsData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return reportsData
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}