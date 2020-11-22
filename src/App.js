import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./App.css";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function App() {
  const [data, setData] = useState({
    eventDate: null,
    scheduleTime: null,
    title: "",
    shortDescription: "",
    header: "",
    content: "",
    contentType: "List",
    footer: "",
    eventURL: "",
  });

  function changeData(key, value) {
    setData((data) => ({ ...data, [key]: value }));
  }

  function renderList(){
    var list = [];
    var listElement = data['content'].split(',');
    console.log(listElement.length);
    for(var i = 0; i< listElement.length; i++){
      list.push(<li>{listElement[i]}</li>)
    }    
    return list;
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(160,160,160, 0.6)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(255,255,255,0.5)",
            height: "75vh",
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            boxShadow: "0px 3px 6px #00000029",
          }}
        >
          <div
            style={{
              width: "50%",
              paddingTop: "25vh",
              paddingBottom: 20,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(255,255,255,0.5)",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid grey",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass">Event Title</div>
              <input
                type="text"
                name="name"
                placeholder="Enter title for the notification"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("title", e.target.value)}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass">Event Short Description</div>
              <input
                type="text"
                name="name"
                placeholder="Event Short Description"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("shortDescription", e.target.value)}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ fontWeight: "bold" }}>
                Event Long Description
              </div>
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "top",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Header Para
              </div>
              <textarea
                rows="4"
                type="text"
                name="content"
                placeholder="Enter header for the paragraph"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("header", e.target.value)}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Content Type
              </div>

              <select
                name="contentType"
                id="contentType"
                value={data["contentType"]}
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("contentType", e.target.value)}
              >
                <option value="list">List</option>
                <option value="para">Information Paragraph</option>
              </select>
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "top",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Content
              </div>
              <textarea
                rows="6"
                type="text"
                name="content"
                placeholder="Enter main content of notification"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("content", e.target.value)}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "top",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Footer Para
              </div>
              <textarea
                rows="4"
                type="text"
                name="content"
                placeholder="Enter footer for the paragraph"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("footer", e.target.value)}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Event URL
              </div>
              <input
                type="text"
                name="name"
                placeholder="Add link for the notification"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
                onChange={(e) => changeData("eventURL", e.target.value)}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Event Date
              </div>
              <DatePicker
                placeholderText="Notification Time"
                selected={data["eventDate"]}
                onChange={(e) => changeData("eventDate", e)}
                showTimeSelect
                timeIntervals={30}
                dateFormat="dd-MMM-yyyy hh:mm aa"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Schedule Date
              </div>
              <DatePicker
                placeholderText="Schedule Time"
                selected={data["scheduleTime"]}
                onChange={(e) => changeData("scheduleTime", e)}
                showTimeSelect
                timeIntervals={30}
                dateFormat="dd-MMM-yyyy hh:mm aa"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "blue",
                color: "white",
                boxShadow: "0px 3px 6px #00000029",
                cursor: "pointer",
              }}
            >
              Schedule Notification
            </div>
          </div>

          <div
            style={{
              width: "50%",
              paddingTop: 20,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(255,255,255,0.5)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>Sample Notification</div>
            <div
              style={{
                width: "40%",
                height: "90%",
                backgroundColor: "white",
                borderRadius: 10,
                boxShadow: "0px 3px 6px #00000029",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingTop: 10,
                marginTop: 10,
              }}
            >
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingBottom: 10,
                  borderBottom: "1px solid lightgrey",
                  fontWeight: "bold",
                }}
              >
                View Notification
              </div>
              <div
                style={{
                  marginLeft: "4%",
                  marginRight: "4%",
                  display: "flex",
                  flexDirection: "column",
                  width: "92%",
                  alignItems: "flex-start",
                  marginTop: 10,
                  flexGrow:1
                }}
              >
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  {data["title"]}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "grey",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <AccessTimeIcon
                    fontSize="small"
                    style={{ marginRight: 10 }}
                  />
                  {data["eventDate"] === null
                    ? null
                    : data["eventDate"].toString().split(" ")[0] +
                      ", " +
                      data["eventDate"].toString().split(" ")[1] +
                      " " +
                      data["eventDate"].toString().split(" ")[2] +
                      " " +
                      data["eventDate"].toString().split(" ")[3] +
                      " - " +
                      data["eventDate"].toString().split(" ")[4].split(":")[0] +
                      ":" +
                      data["eventDate"].toString().split(" ")[4].split(":")[1]}
                </div>
                <div style={{ marginTop: 10 }}>{data["shortDescription"]}</div>
                <div style={{ marginTop: 10 }}>{data["header"]}</div>
                {
                  data['contentType'] === 'para' ? <div style={{ marginTop: 10 }}>{data["content"]}</div> :
                  <div style={{ marginTop: 10 }}>
                    <ul>
                    {renderList()}
                    </ul>
                  </div>   
                }
                
                <div style={{ marginTop: 10 }}>{data["footer"]}</div>
                <div style={{ flexGrow: 1 }}></div>
                {data["eventURL"] === "" ? null : (
                  <div
                    style={{
                      width: "100%",
                      paddingTop: 5,
                      paddingBottom: 5,
                      marginBottom: 10,
                      backgroundColor: "blue",
                      color: "white",
                      alignSelf: "flex-end",
                      fontWeight:'bold',
                      boxShadow:'0px 3px 6px #00000029'
                    }}
                  >
                    View Details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
