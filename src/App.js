import React, { useEffect, useState, useRef } from "react";
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
    dbEventDate: "",
    dbScheduleDate: "",
    error: {
      urlError: false,
      eventDateError: false,
      notiScheduleError: false,
      titleError: false,
      shortDescriptionError: false,
      contentError: false,
      emptyEventDateError: false,
      emptyNotiDateError: false
    }

  });

  function changeData(key, value) {
    setData((data) => ({ ...data, [key]: value }));
  }

  function renderList() {
    var list = [];
    var listElement = data['content'].split(',');
    console.log(listElement.length);
    for (var i = 0; i < listElement.length; i++) {
      list.push(<li style={{ wordBreak: 'break-all' }}>{listElement[i]}</li>)
    }
    return list;
  }

  var expression = /(https|http){1}\:\/\/www\.\w\S{0,}\.\w\S{0,}/gm;
  var regex = new RegExp(expression);

  function convertToNumber(monthString) {
    switch (monthString) {
      case 'Jan':
        return '01';
      case 'Feb':
        return '02';
      case 'Mar':
        return '03';
      case 'Apr':
        return '04';
      case 'May':
        return '05';
      case 'Jun':
        return '06';
      case 'Jul':
        return '07';
      case 'Aug':
        return '08';
      case 'Sep':
        return '09';
      case 'Oct':
        return '10';
      case 'Nov':
        return '11';
      case 'Dec':
        return '12';
    }
  }

  function validateData() {
    var errorData = data['error'];
    errorData['titleError'] = false;
    errorData['shortDescriptionError'] = false;
    errorData['contentError'] = false;
    errorData['urlError'] = false;
    errorData['emptyEventDateError'] = false;
    errorData['eventDateError'] = false;
    errorData['emptyNotiDateError'] = false;
    errorData['notiScheduleError'] = false;
    var dataValidate = true;




    if (data['title'] === '') {
      var errorData = data['error'];
      errorData['titleError'] = true;
      changeData('error', errorData);
      titleInput.current.focus();
      dataValidate = false;
    }
    if (data['shortDescription'] === '') {
      var errorData = data['error'];
      errorData['shortDescriptionError'] = true;
      changeData('error', errorData);
      sdInput.current.focus();
      dataValidate = false;
    }
    if (data['content'] === '') {
      var errorData = data['error'];
      errorData['contentError'] = true;
      changeData('error', errorData);
      contentInput.current.focus();
      dataValidate = false;
    }
    if (data['eventURL'] !== '' && !data['eventURL'].match(regex)) {
      var errorData = data['error'];
      errorData['urlError'] = true;
      changeData('error', errorData);
      urlInput.current.focus();
      dataValidate = false;
    }
    if (data['eventDate'] === null) {
      var errorData = data['error'];
      errorData['emptyEventDateError'] = true;
      errorData['eventDateError'] = false;
      changeData('error', errorData);
      dataValidate = false;
    }
    else if (data['eventDate'] < new Date()) {
      var errorData = data['error'];
      errorData['emptyEventDateError'] = false;
      errorData['eventDateError'] = true;
      changeData('error', errorData);
      dataValidate = false;
    }
    if (data['scheduleTime'] === null) {
      var errorData = data['error'];
      errorData['emptyNotiDateError'] = true;
      errorData['notiScheduleError'] = false;
      changeData('error', errorData);
      dataValidate = false;
    }
    else if (data['scheduleTime'] < new Date()) {
      var errorData = data['error'];
      errorData['emptyNotiDateError'] = false;
      errorData['notiScheduleError'] = true;
      changeData('error', errorData);
      dataValidate = false;
    }

    if (dataValidate) {
      data['dbEventDate'] = 
      (data["eventDate"].toString().split(" ")[3]) + '-' +
      convertToNumber(data["eventDate"].toString().split(" ")[1]) + '-' +
      (data["eventDate"].toString().split(" ")[2]) + ' ' +
      (data["eventDate"].toString().split(" ")[4]);
      
      data['dbScheduleDate'] = 
      (data["scheduleTime"].toString().split(" ")[3]) + '-' +
      convertToNumber(data["scheduleTime"].toString().split(" ")[1]) + '-' +
      (data["scheduleTime"].toString().split(" ")[2]) + ' ' +
      (data["scheduleTime"].toString().split(" ")[4]);

      let formData = new FormData();
      formData.append('postDate', data);
      var x = new XMLHttpRequest();

      x.open('POST', 'http://localhost:3000/addNotification', true);
      x.setRequestHeader("Content-Type", "application/json");
      x.onload = function () {
        var json = JSON.parse(x.responseText);
        if(json.success){
          alert("Notification Added to the server. It will be sended on scheduled time");
		  window.location.reload(); 
        }
        else{
          alert("Error in adding notification to the server. Please try again");
          window.location.reload(); 
        }
      };
      x.send(JSON.stringify({
        data
      }));
    }


  }

  useEffect(() => {
    if (data['eventURL'] !== '') {
      if (!data['eventURL'].match(regex) && data['error']['urlError'] === false) {

        var errorData = data['error'];
        errorData['urlError'] = true;
        changeData('error', errorData);
      }
      else if (data['eventURL'].match(regex) && data['error']['urlError'] === true) {
        var errorData = data['error'];
        errorData['urlError'] = false;
        changeData('error', errorData);
      }
    }
    else if (data['error']['urlError'] === true) {
      var errorData = data['error'];
      errorData['urlError'] = false;
      changeData('error', errorData);
    }

    console.log(data);

  }, [data, data['eventURL']]);

  const titleInput = useRef(null);
  const sdInput = useRef(null);
  const contentInput = useRef(null);

  const urlInput = useRef(null);

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
              paddingTop: 20,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(255,255,255,0.5)",
              alignItems: "center",
              overflowY: 'scroll',

              borderRight: "1px solid grey",
              flexWrap: "nowrap",
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
                  border: data['error']['titleError'] ? '1.5px solid red' : "none"
                }}
                ref={titleInput}
                onChange={(e) => {
                  var errorData = data['error'];
                  errorData['titleError'] = false;
                  changeData('error', errorData);
                  changeData("title", e.target.value)
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
                  border: data['error']['shortDescriptionError'] ? '1.5px solid red' : "none"
                }}
                ref={sdInput}
                onChange={(e) => {
                  var errorData = data['error'];
                  errorData['shortDescriptionError'] = false;
                  changeData('error', errorData);
                  changeData("shortDescription", e.target.value);
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
              <div className="labelClass" style={{ fontWeight: "bold", width: '100%' }}>
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
                  border: data['error']['contentError'] ? '1.5px solid red' : "none"
                }}
                ref={contentInput}
                onChange={(e) => {
                  var errorData = data['error'];
                  errorData['contentError'] = false;
                  changeData('error', errorData);
                  changeData("content", e.target.value)
                }}
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
                placeholder="https://www.conestogac.on.ca"
                style={{
                  flexGrow: 1,
                  border: "none",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 20,
                  border: data['error']['urlError'] ? '1.5px solid red' : "none"
                }}
                ref={urlInput}
                onChange={(e) => {
                  changeData("eventURL", e.target.value);
                }}
              />
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Event Date
              </div>
              <div style={{
                border: data['error']['eventDateError'] ? '1.5px solid red' : "none"
              }}

              >
                <DatePicker
                  placeholderText="Notification Time"
                  selected={data["eventDate"]}
                  onChange={(e) => {
                    var errorData = data['error'];
                    errorData['emptyEventDateError'] = false;
                    errorData['eventDateError'] = false;
                    changeData('error', errorData);
                    changeData("eventDate", e)
                  }}
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
            </div>
            <div style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}>
              <div className='labelClass'></div>
              <div
                style={{ color: 'red', marginBottom: 20, }}
              >
                {data['error']['emptyEventDateError'] ? "Event date must be selected" : ""}
                {data['error']['eventDateError'] ? "Event date cannot be less than today" : ""}
              </div>
            </div>

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div className="labelClass" style={{ marginRight: 20 }}>
                Schedule Date
              </div>
              <div
                style={{
                  border: data['error']['notiScheduleError'] ? '1.5px solid red' : "none"
                }}
              >
                <DatePicker
                  placeholderText="Schedule Time"
                  selected={data["scheduleTime"]}
                  onChange={(e) => {
                    var errorData = data['error'];
                    errorData['emptyNotiDateError'] = false;
                    errorData['notiScheduleError'] = false;
                    changeData('error', errorData);
                    changeData("scheduleTime", e)
                  }}
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
                    border: data['error']['notiScheduleError'] ? '1.5px solid red' : "none"
                  }}
                />
              </div>
            </div>
            <div style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}>
              <div className='labelClass'></div>
              <div
                style={{ color: 'red', marginBottom: 20, }}
              >
                {data['error']['emptyNotiDateError'] ? "Notification date must be selected" : ""}
                {data['error']['notiScheduleError'] ? "Notification date cannot be less than today" : ""}
              </div>
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
              onClick={() => validateData()}
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
                maxHeight: 900,
                maxWidth: 400,
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
                  height: '5%'
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
                  justifyContent: 'flex-start',
                  marginTop: 10,
                  height: '95%'
                }}
              >
                <div style={{
                  height: '80%',
                  marginBottom: '5%',
                  width: '100%',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
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
                  <div style={{ marginTop: 5 }}>{data["shortDescription"]}</div>
                  <div style={{ marginTop: 5 }}>{data["header"]}</div>
                  {
                    data['contentType'] === 'para' ? <div style={{ marginTop: 5 }}>{data["content"]}</div> :
                      <div style={{ marginTop: 5, textAlign: 'left' }}>
                        <ul>
                          {renderList()}
                        </ul>
                      </div>
                  }

                  <div style={{ marginTop: 5 }}>{data["footer"]}</div>
                </div>

                {data["eventURL"] === "" ? null : (
                  <div
                    style={{
                      width: "100%",
                      height: '10%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: "blue",
                      color: "white",
                      alignSelf: "flex-end",
                      fontWeight: 'bold',
                      boxShadow: '0px 3px 6px #00000029',
                      cursor: 'pointer'
                    }}
                    onClick={() => { alert('You will be redirected to ' + data['eventURL']) }}
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
