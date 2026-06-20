"use client";


import {
  APIProvider,
  Map,
  Marker
} from "@vis.gl/react-google-maps";


const parking = [

{
id:1,
name:"Dubai Marina Parking",
lat:25.080,
lng:55.140
},


{
id:2,
name:"Mall Parking",
lat:25.197,
lng:55.279
}

];


export default function SmartMap(){


return (

<APIProvider
apiKey={
process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
}
>


<div
className="
w-full
h-[550px]
rounded-xl
overflow-hidden
shadow-lg
"
>


<Map 

defaultZoom={13}

defaultCenter={{
lat:25.2048,
lng:55.2708
}}


gestureHandling="greedy"

disableDefaultUI={false}

>


{

parking.map((item)=>(

<Marker

key={item.id}

position={{
lat:item.lat,
lng:item.lng
}}

/>

))

}


</Map >


</div>


</APIProvider>


)

}