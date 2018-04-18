# comp4970-fog-architecture
A small representation of the benefits that fog related architecture can deliver to the Internet of Things.

## Architecture: IoT
The IoT device in this case is the traffic camera. We have chosen to represent this by a laptop that will pull data from a live stream video of the Toomers corner intersection and send this data to the corresponding FoG or Cloud server to be processed, analyzed, and stored. The laptop itself is not the best representation of an IoT device but it serves its purpose correctly by not attempting to process  any of the image recognition itself and not storing any statistical data.
  
## Architecture: FoG
The FoG server for this project is running on an i7 processor with 3.10 GHz and 16GB of RAM. The FoG and Cloud server have the same application deployed to them so that they can communicate with each other but also process the requested task independently of each other. The FoG machine has a ping from the IoT devices that averages at around 8-10ms.
  
## Architecture: Cloud
The cloud server is being represented by a free US West Heroku instance. The processor specifications were not given besides that it is a single process and that it has 512MB of RAM available. The cloud server experienced an average ping of 93-95ms. As mentioned, the cloud server has the full capabilities of the FoG server while also having the ability to interact with it. 

