An experiment that uses Flux and react-leaflet.

Instabus displays transit data, so it uses Leaflet to display vehicles, stops and polylines along a route. I have a StopStore, VehicleStore, RouteStore and PolylineStore: https://github.com/luqmaan/instabus-react/blob/master/client/js/stores/. 

![image](https://cloud.githubusercontent.com/assets/1275831/6669521/5fa986b0-cbc7-11e4-908a-859bf323de57.png)

A lesser version of https://github.com/luqmaan/instabus

Give it a whirl:

```
git clone https://github.com/luqmaan/instabus-react.git
cd instabus-react
npm install
gulp clean && gulp
```
