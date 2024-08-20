import withAuth from "@/authentication/withauth";
import React from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import Navbar from "@/Components/Common/Navbar";


const index = () => {
  const pageHeading = "Billing"
  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="shiftRequestFilter mt-3">
        <div>
          <h3 className="headingGreen20 mb-0">Billing</h3>
          {/* <p className="text14 mb-0"> </p> */}
        </div>
      </div>

      <div className="jobContent">
        <div className="jobTable mt-3">
          <table className="commonTable">
            <thead>
              <tr>
                <th className="tableHeading">Location</th>
                <th className="tableHeading">Date</th>
                <th className="tableHeading">Role</th>
                <th className="tableHeading jobRequestTo">Asigned To</th>
                <th className="tableHeading">Job Requested By</th>
              </tr>
            </thead>
            <tbody>
                  <tr>
                    <td className="tableHeading">
                      <Image
                        src={images.locationIcon}
                        className="locationImg"
                        alt="locationIcon"
                      />
                      <span className="mb-0">
                       sdfmksrng
                      </span>
                      <br />
                      <span className="text12">scdkadb</span>
                    </td>
                    <td className="tableHeading">
                      <Image
                        src={images.calanderDark}
                        alt="calenderIcon"
                        className="calenderImg"
                      />
                      <span className="ps-1">
                        df
                      </span>
                      <br />
                      <Image src={images.clockIcon} alt="clockIcon" />{" "}
                      <span className="ps-1 me-2">
                    sgf
                      </span>
                    </td>
                    <td className="tableHeading">
                      <button className="requestForBtn">
                        regvrfb
                      </button>
                    </td>
                    <td className="tableHeading jobRequestToData">
                      <Image
                        src={

                          images.customerImg
                        }
                        width={50}
                        height={50}
                        className="customerImg"
                        alt="customerImg"
                      />
                      <span className="jobCustomerName">
                       JOhn Smith
                      </span>
                    </td>
                    <td className="tableHeading jobRequestToData">
                      <Image
                        src={
                          images.customerImg
                        }
                        width={50}
                        height={50}
                        className="customerImg"
                        alt="customerImg"
                      />
                      <span className="jobCustomerName">
                       JOhn Smith
                      </span>
                    </td>
                  
                  </tr>
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    <h4>No Billing found.</h4>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default withAuth(index);
