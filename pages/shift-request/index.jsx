import React, { useState } from 'react'
import * as images from "@/utilities/images.js";
import Image from "next/image";
import DatePicker from "react-datepicker"
import withAuth from '@/authentication/withauth';
const index = () => {
  const [filterTab, setFilterTab] = useState()
  return (
    <>
    <div className='shiftRequestOuter'>
      <div className="row mt-3">
        <div className='col-md-12'>
          <div className='shiftRequestFilter'>
            <h3 className='headingGreen20 mb-0'>3 New Shift Requests</h3>
            <div className='shiftRequestRight'>
              <button className="dashFilterBtn me-2" onClick={()=>{setFilterTab(prev=>!prev)}}>
                <Image src={images.filterIcon} className='me-2' alt='img'/> Filter 
                <Image src={images.downArrow} className='ms-2' alt='img'/>
              </button>
              <button className="dashFilterBtn" onClick={()=>{setFilterTab(prev=>!prev)}}>
                <Image src={images.swapIcon} className='me-2' alt='img'/> Sort  
                <Image src={images.downArrow} className='ms-2' alt='img'/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className='commonTable'>
            <thead>
              <tr>
                <th className='tableHeading'>Location</th>
                <th className='tableHeading'>Date</th>
                <th className='tableHeading'>Request For</th>
                <th className='tableHeading'>Request To</th>
                <th className='tableHeading'>Request Created on</th>
                <th className='tableHeading'>Assign To</th>
                <th className='tableHeading'>Action</th>
                <th className='tableHeading text-center'>View Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='tableHeading'>Mercy Hospital, Tamp,FL <br/><span className='text12'>1744 Evie Turnpike Hayden Pass 8956...</span></td>
                <td className='tableHeading'>24 Aug - 18 Sep, 2022 <br/> 05 pm - 10pm</td>
                <td className='tableHeading'><button className='requestForBtn'>Nurse</button></td>
                <td className='tableHeading'>John Smith</td>
                <td className='tableHeading'>16 Aug, 2022</td>
                <td className='tableHeading'><button className='assignToSelectBtn'>Select</button></td>
                <td className='tableHeading'>
                  <Image src={images.deleteIcon} className='me-2 cursor' alt='img'/>
                  <Image src={images.penIcon} className='ms-2 cursor' alt='img'/>
                </td>
                <td className='tableHeading text-center'>
                  <Image src={images.rightArrow} className='cursor' alt='img'/>
                </td>
              </tr>
              <tr>
                <td className='tableHeading'>Mercy Hospital, Tamp,FL <br/><span className='text12'>1744 Evie Turnpike Hayden Pass 8956...</span></td>
                <td className='tableHeading'>24 Aug - 18 Sep, 2022 <br/> 05 pm - 10pm</td>
                <td className='tableHeading'><button className='requestForBtn'>Nurse</button></td>
                <td className='tableHeading'>John Smith</td>
                <td className='tableHeading'>16 Aug, 2022</td>
                <td className='tableHeading'><button className='assignToSelectBtn'>Select</button></td>
                <td className='tableHeading'>
                  <Image src={images.deleteIcon} className='me-2 cursor' alt='img'/>
                  <Image src={images.penIcon} className='ms-2 cursor' alt='img'/>
                </td>
                <td className='tableHeading text-center'>
                  <Image src={images.rightArrow} className='cursor' alt='img'/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default withAuth(index)