import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";
import ApiPath from "@/constants/apiPath";
import { getCalendarJobs } from "@/redux/slices/web";
import { ApiClient } from "@/utilities/api";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";

const index = () => {
  const pageHeading = "Calendar";
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const [territory, setTerritory] = useState("");
  const [event, setEvents] = useState([]);

  useEffect(() => {
    if (territory?.value) {
      getJobList(territory?.value);
    }
  }, [territory?.value]);

  const getJobList = (id) => {
    let params = {
      id,
    };
    dispatch(
      getCalendarJobs({
        ...params,
        cb(res) {
          let data = res?.data?.map((item) => {
            return {
              title: `${item?.sites?.name} | ${item?.designation?.name}`,
              start: new Date(item?.start_date),
              end: new Date(item?.end_date),
            };
          });
          setEvents(data);
        },
      })
    );
  };

  const getTerritoryListAction = async (search, loadedOptions, { page }) => {
    let params = {
      page,
      limit: 10,
      status: 1,
    };
    if (search) params.search = search;

    const response = await ApiClient.get(
      ApiPath.WebApiPath.GET_TERRITORY_LIST,
      { params }
    );

    const resp = await response?.data?.payload;

    return {
      options: resp?.data.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
      hasMore: resp?.total_pages > page,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="territoryContent mt-3">
        <div className="shiftRequestFilter">
          <div>
            <h3 className="headingGreen20 mb-0">Calendar</h3>
          </div>
        </div>
        <div className="jobCreateSelectCustomer w-25 mt-3">
          <AsyncPaginate
            loadOptions={getTerritoryListAction}
            debounceTimeout={500}
            additional={{
              page: 1,
            }}
            value={territory}
            onChange={(e) => setTerritory(e)}
          />
        </div>

        <div className="territoryTable mt-3">
          <Calendar
            localizer={localizer}
            events={event}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(index);
