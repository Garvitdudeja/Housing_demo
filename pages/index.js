import withAuth from "@/authentication/withauth";
import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getDashboard } from "@/redux/slices/web";
import { hanldeWholeNumbers } from "@/function/commonFunctions";
import Logs from "@/Components/Dashboard/Logs";
import Navbar from "@/Components/Common/Navbar";
import { useRouter } from "next/router";


const dashboard = (props) => {
  const pageHeading = "Dashboard"
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    dispatch(
      getDashboard({
        cb(res) {
          setData(res?.data?.payload);
        },
      })
    );
  }, []);

  return (
        <>
      <Navbar heading={pageHeading}/>
          <div className="mainContent mt-3">
            <h2 className="heading20">Overview</h2>
            <div className="row mb-5">
              <div className='col-md-12'>
                <div className='grid-container'>
                  <div className='assignShiftBtn' onClick={()=>{router.push("/job")}}>
                    <Image src={images.shiftShape1} className='shiftImg1'/>
                    <Image src={images.shiftShape2} className='shiftImg2'/>
                    <Image src={images.shiftShape3} className='shiftImg3'/>
                    Assign jobs
                  </div>
                  <Link href="/customers">
                    <div className="dashboardCard">
                      <Image src={images.arrowShape} className='arrowShape'/>
                      <div className="dashboardImg">
                        <Image src={images.dashCustomer} className='dashCustomer'/>
                      </div>
                      <div className="dashboardTxt">
                        <p className='heading12 mb-0'>Total Customers</p>
                        <h6 className='heading30 fw-500'>{hanldeWholeNumbers(data?.customer_count)}</h6>
                      </div>
                    </div>
                  </Link>
                  <Link href="/supervisors">
                  <div className="dashboardCard">
                  <Image src={images.arrowShape} className='arrowShape'/>
                    <div className="dashboardImg supervisor">
                      <Image src={images.dashCustomer} className='dashCustomer'/>
                    </div>
                    <div className="dashboardTxt">
                      <p className='heading12 mb-0'>Total Supervisors</p>
                      <h6 className='heading30 fw-500'> {hanldeWholeNumbers(data?.supervisor_Count)}</h6>
                    </div>
                  </div>
                </Link>
                <Link href="/staff">
                  <div className="dashboardCard">
                  <Image src={images.arrowShape} className='arrowShape'/>
                    <div className="dashboardImg employees">
                      <Image src={images.dashCustomer} className='dashCustomer'/>
                    </div>
                    <div className="dashboardTxt">
                      <p className='heading12 mb-0'>Active Staff</p>
                      <h6 className='heading30 fw-500'>{hanldeWholeNumbers(data?.employee_count)}</h6>
                    </div>
                  </div>
                </Link>
                <Link href="/shift">
                  <div className="dashboardCard">
                  <Image src={images.arrowShape} className='arrowShape'/>
                    <div className="dashboardImg shifts">
                      <Image src={images.dashCustomer} className='dashCustomer'/>
                    </div>
                    <div className="dashboardTxt">
                      <p className='heading12 mb-0'>Active Shifts</p>
                      <h6 className='heading30 fw-500'>{hanldeWholeNumbers(data?.shift_count)}</h6>
                    </div>
                  </div>
                </Link>
                </div>
              </div>
            </div>
            <Logs/>

          </div>
        </>
  )
}

export default withAuth(dashboard);
