import { Fab, makeStyles } from '@material-ui/core'
import { AddCircleOutlined, ArrowUpward } from '@material-ui/icons'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '../contexts/DetailsContext';
import { ViewPortContext } from '../contexts/ViewPortContext';
import Map from './Map'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(2),
    },
  }));
function Home() {
    const [details,setdetails] = useContext(DetailsContext)
    const [,setviewport ] = useContext(ViewPortContext)
    const [input, setinput] = useState("")
    const classes = useStyles();
    useEffect(() => {
        axios.get('http://api.ipstack.com/check?access_key=5e1bd0eb56486cc5384b47085e5659de').then((data)=>{
            console.log(data.data.latitude);
            console.log(data.data.longitude);
            setdetails({
                ip:data.data.ip,
                location:data.data.city,
                city:data.data.location.capital,
                postalcode:data.data.zip
            });
            setviewport({
                latitude: data.data.latitude,
                longitude: data.data.longitude,
                width:'100vw',
                height:'100vh',
                zoom : 10,
            });
        }).catch(err=>{
            console.log(err);
        })
    }, [])
    const findByIp = () =>{
        setdetails({
            ip:"Loading..",
            location:"Loading..",
            city:"Loading..",
            postalcode:"Loading.."
        });
        axios.get(`http://api.ipstack.com/${input}?access_key=5e1bd0eb56486cc5384b47085e5659de`).then((data)=>{
            console.log(data.data.latitude);
            console.log(data.data.longitude);
            setdetails({
                ip:data.data.ip,
                location:data.data.city,
                city:data.data.location.capital,
                postalcode:data.data.zip
            });
            setviewport({
                latitude: data.data.latitude,
                longitude: data.data.longitude,
                width:'100vw',
                height:'100vh',
                zoom : 10,
            });
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <>
        <div className="">
        <div className="relative w-full grid grid-flow-row grid-cols-1 gap-10 md:gap-0 headbg h-96">
            <p className="text-3xl md:text-4xl mx-auto mt-12 md:mt-16 font-extrabold text-white">IP Address Tracker</p> 
            <div className="w-4/5 md:w-1/2  relative mx-auto flex h-10 md:h-20 bg-white rounded-xl md:rounded-3xl">
                <input type="text" className="my-2 ml-2 w-full mr-8 pl-4 focus:outline-none" placeholder="Enter the ip to find" onChange={(e)=>{
                    setinput(e.target.value)
                }}/>
                <div className="absolute flex right-0 top-0 h-10 md:h-20 w-10 md:w-20 hover:bg-gray-700 bg-gray-600 md:rounded-r-3xl rounded-r-xl" onClick={findByIp}>
                    <img className="mx-auto my-auto h-6" src="icon-arrow.svg" alt="" />
                </div>
            </div>
            <div>
            <div className="w-11/12 md:w-3/4 grid  z-10 -mb-28 relative mx-auto  md:h-32 bg-white shadow-2xl rounded-3xl">
            <div className="md:grid-flow-row pb-4 grid-flow-col grid grid-rows-5 md:grid-cols-4 w-full h-full ">
                <div className="border-r-4 w-full h-full">
                    <p className="text-gray-400 text-2xl font-bold ml-6 mt-4">Ip address</p>
                    <p className="text-gray-700 text-4xl font-bold ml-10 mt-4">{details.ip}</p>
                </div>
                <div className="border-r-4 w-full h-full">
                    <p className="text-gray-400 text-2xl font-bold ml-6 mt-4">Location</p>
                    <p className="text-gray-700 text-4xl font-bold ml-10 mt-4">{details.location}</p>
                </div>
                <div className="border-r-4 w-full h-full">
                    <p className="text-gray-400 text-2xl font-bold ml-6 mt-4">Capital</p>
                    <p className="text-gray-700 text-4xl font-bold ml-10 mt-4">{details.city}</p>
                </div>
                <div className=" w-full h-full">
                    <p className="text-gray-400 text-2xl font-bold ml-6 mt-4">Postal code</p>
                    <p className="text-gray-700 text-4xl font-bold ml-10 mt-4">{details.postalcode}</p>
                </div>
                <div className="md:hidden relative flex flex-col w-full ">
                    <p className="text-gray-400 text-xl mx-auto my-auto font-bold ">Drag Here To view map</p>                    
                </div>

            </div>

            </div>
            </div>
        </div>
        <div id="map" className="w-full relative h-1/2">
            <Map />
        </div>
        </div>


        </>

    )
}

export default Home
