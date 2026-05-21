import { useState } from "react"
import axios from "axios"
import "./index.css"

function App() {

  const [activeTab, setActiveTab] = useState("generate")

  const [url, setUrl] = useState("")

  const [quiz, setQuiz] = useState("")

  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useState([])

  const [selectedQuiz, setSelectedQuiz] = useState("")

  const [showModal, setShowModal] = useState(false)

  const [error, setError] = useState("")


  const generateQuiz = async () => {

    try {

      setError("")

      if (!url) {
        setError("Please enter Wikipedia URL")
        return
      }

      setLoading(true)

      const response = await axios.post(
        "http://127.0.0.1:8000/generate-quiz",
        {
          url: url
        }
      )

      setQuiz(response.data.quiz)

      setLoading(false)

    } catch (error) {

      setError("Failed to generate quiz")

      console.log(error)

      setLoading(false)
    }
  }


  const getHistory = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/history"
      )

      setHistory(response.data)

    } catch (error) {

      console.log(error)
    }
  }


  const deleteQuiz = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/delete-quiz/${id}`
      )

      getHistory()

    } catch (error) {

      console.log(error)
    }
  }


  const tableStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left"
  }


  return (

    <div className="container">

      <h1 className="heading">Wiki Quiz Generator</h1>

      <div className="tabs">

        <button
          onClick={() => setActiveTab("generate")}
        >
          Generate Quiz
        </button>

        <button
          onClick={() => {
            setActiveTab("history")
            getHistory()
          }}
        >
          History
        </button>

      </div>


      {
        activeTab === "generate"
          ? (
            <div>

              <div className="input-section">

                <input
                  type="text"
                  placeholder="Enter Wikipedia URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />

                <button onClick={generateQuiz}>
                  Generate Quiz
                </button>

              </div>


              {
                error && (
                  <p style={{ color: "red" }}>
                    {error}
                  </p>
                )
              }


              {
                loading
                  ? (
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px"
                      }}
                    >
                      <h3>Generating AI Quiz...</h3>
                    </div>
                  )
                  : (
                    quiz && (
                      <div className="quiz-card">

                        <h2>Generated Quiz</h2>

                        <pre>{quiz}</pre>

                      </div>
                    )
                  )
              }

            </div>
          )

          : (

            <div>

              <h2>Past Quizzes</h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "white"
                }}
              >

                <thead>

                  <tr>

                    <th style={tableStyle}>ID</th>

                    <th style={tableStyle}>Title</th>

                    <th style={tableStyle}>Wikipedia URL</th>

                    <th style={tableStyle}>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    history.map((item, index) => (

                      <tr key={item.id}>

                        <td style={tableStyle}>
                          {index + 1}
                        </td>

                        <td style={tableStyle}>
                          {item.title}
                        </td>

                        <td style={tableStyle}>
                          {item.url}
                        </td>

                        <td style={tableStyle}>

                          <div
                            style={{
                              display: "flex",
                              gap: "10px"
                            }}
                          >

                            <button
                              onClick={() => {
                                setSelectedQuiz(item.quiz)
                                setShowModal(true)
                              }}
                            >
                              Details
                            </button>

                            <button
                              onClick={() => deleteQuiz(item.id)}
                              style={{
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "5px",
                                cursor: "pointer"
                              }}
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>
          )
      }


      {
        showModal && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >

            <div
              style={{
                background: "white",
                width: "70%",
                padding: "20px",
                borderRadius: "10px",
                maxHeight: "80%",
                overflowY: "scroll"
              }}
            >

              <h2>Quiz Details</h2>

              <pre>{selectedQuiz}</pre>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: "20px",
                  padding: "10px"
                }}
              >
                Close
              </button>

            </div>

          </div>
        )
      }

    </div>
  )
}

export default App