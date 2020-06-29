# Smart-Irrigation-System Using Arduino and MQTT protocol

App link
http://irrigation-smart.herokuapp.com/

The proposed system has been designed to overcome the unnecessary water flow into the agricultural lands. Temperature, moisture and
humidity readings are continuously monitored by using temperature, moisture and
humidity sensor and send these values which will be displayed in our website using
MQTT protocol. MQTT is a publisher-subscriber based messaging protocol used in the
Internet of Things.It works on top of the TCP/IP protocol, and is designed for connections with remote
locations where a "small code footprint" is required or the network bandwidth is
limited. In this project we implemented remote temperature, humidity and moisture
sensing. The sensor data is fetched by the johnny five node application. The johnny five
application sends the data to the node.js server using MQTT protocol so that 2 way
communication is possible all the time. The node.js server communicates with the
browser using the HTTP protocol (requestresponse) so that browser can display the
temperature and moisture values. In this way we intend to display the values of remote
agricultural fields and this can be accessed through our mobile or any other devices.

Once the soil moisture values are exceeded the particular limit than the relay, which is
connected to the Arduino microcontroller controls the motor. The web application is a
simple menu driven application, with 4 options. This includes motor on/off, moisture,
temperature and humidity values. The motor status indicates the current status of the
pump. If the values from the humidity and moisture sensors are less than the predefined
threshold then the motor starts and therefore the water pump turns on and pumps water
into the plant / crop, thus obliviating human effort. By this way we can provide an
access control to the user by adding controls features that will enable the user to
remotely access the system.
