import React from 'react'
import * as images from "@/utilities/images.js";
import Image from "next/image";
import withAuth from '@/authentication/withauth';
import Navbar from '@/Components/Common/Navbar';

function hoursLog() {
  const pageHeading = "Customer"
  return (
   <>
    <Navbar heading={pageHeading}/>
   <div className="hoursLog">
   <div className="commonHeader mb-3">
        <div className="hospitalDetail">
            <div className='backArrowBtn'>
                <Image src={images.leftArrowLong} alt='img'/>
            </div>
            <div className='hospitalDetailOuter'>
                <div className="locationIconOuter">
                    <Image src={images.clockIcon} alt='img' className='clockImg'/>
                </div>
                <div className="hospitalDetailText">
                    <h4 className='heading16'>124 hrs</h4>
                    <p className='text14'>Total hrs logged till now</p>
                </div>
            </div>
        </div>
    </div>
    <div className="col-md-12 mt-3">
        <p className="heading16">Daily Hrs Logged</p>
    </div>
    <div className="row">
        <div className="col-md-12">
          <div className="hoursLogTable">
          <table className='commonTable'>
            <thead>
              <tr>
                <th className='tableHeading'>Day</th>
                <th className='tableHeading'>Date</th>
                <th className='tableHeading'>Time in</th>
                <th className='tableHeading'>Time Out</th>
                <th className='tableHeading'>Total Hrs</th>
                <th className='tableHeading'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='tableHeading'>Monday</td>
                <td className='tableHeading'>24 Aug, 2022</td>
                <td className='tableHeading'>05:00 pm</td>
                <td className='tableHeading'>10:30 pm</td>
                <td className='tableHeading'>5:30hrs</td>
                <td className='tableHeading'>
                  <Image src={images.penIcon} className='ms-2 cursor' alt='img'/>
                </td>
              </tr>
              <tr>
                <td className='tableHeading'>Monday</td>
                <td className='tableHeading'>24 Aug, 2022</td>
                <td className='tableHeading'>05:00 pm</td>
                <td className='tableHeading'>10:30 pm</td>
                <td className='tableHeading'>5:30hrs</td>
                <td className='tableHeading'>
                  <Image src={images.penIcon} className='ms-2 cursor' alt='img'/>
                </td>
              </tr>
              <tr>
                <td className='tableHeading'>Monday</td>
                <td className='tableHeading'>24 Aug, 2022</td>
                <td className='tableHeading'>05:00 pm</td>
                <td className='tableHeading'>10:30 pm</td>
                <td className='tableHeading'>5:30hrs</td>
                <td className='tableHeading'>
                  <Image src={images.penIcon} className='ms-2 cursor' alt='img'/>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
   </div>
   </>
  )
}

export default withAuth(hoursLog)
