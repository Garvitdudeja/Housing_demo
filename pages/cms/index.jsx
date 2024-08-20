import withAuth from "@/authentication/withauth";
import BlueSpinner from "@/Components/Common/BlueSpinner";
import Navbar from "@/Components/Common/Navbar";
import Spinner from "@/Components/Common/Spinner";
import { useWebSelector } from "@/redux/selector/web";
import { getCMS, updateCMS } from "@/redux/slices/web";
import { CKEditor } from "ckeditor4-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const index = () => {
  const [activeTab, setActiveTab] = useState("about_us");
  const [data, setData] = useState("");
  const webSelector = useWebSelector();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const showAbout = () => {
    setActiveTab("about_us");
  };

  const showTerms = () => {
    setActiveTab("term_conditions");
  };

  const showPrivacy = () => {
    setActiveTab("privacy_policy");
  };
  const getData = () => {
    dispatch(
      getCMS({
        search: activeTab,
        cb(res) {
          setData(res?.pages[0]?.body);
          setLoading(false);
        },
      })
    );
  };
  useEffect(() => {
    setData("");
    setLoading(true);
    getData();
  }, [activeTab]);

  const UpdateId = {
    about_us: 1,
    term_conditions: 2,
    privacy_policy: 3,
  };
  const updateContent = () => {
    dispatch(
      updateCMS({
        id: UpdateId[activeTab],
        body: data,
        title: activeTab,
        cb(res) {
          toast.success("Content updated successfully");
        },
      })
    );
  };
  const inputHandler = (event, editor) => {
    const data = event.editor.getData();
    setData(data);
  };
  return (
    <>
      <Navbar heading={"CMS"} />
      <div className="shiftRequestFilter mt-3">
        <div>
          <h3 className="headingGreen20 mb-0">CMS</h3>
        </div>
      </div>
      <div className="employPersonalJobSlider mt-3">
        <p
          className={`heading16 employPersonalBtn ${
            activeTab === "about_us" ? "active" : ""
          }`}
          onClick={showAbout}
        >
          About Us
        </p>

        <p
          className={`heading16 employPersonalBtn ${
            activeTab === "term_conditions" ? "active" : ""
          }`}
          onClick={showTerms}
        >
          Terms & Conditions
        </p>
        <p
          className={`heading16 employPersonalBtn ${
            activeTab === "privacy_policy" ? "active" : ""
          }`}
          onClick={showPrivacy}
        >
          Privacy Policy
        </p>
      </div>
      <>
        {data == "" ? (
          <BlueSpinner/>
        ) : (
          <div className="CmsContent mt-3">
            <CKEditor
              config={{
                versionCheck: false,
              }}
              initData={data ?? ""}
              onChange={inputHandler}
            />
          </div>
        )}
        <button
          onClick={() => {
            updateContent();
          }}
          className="commonBtnFill me-3 mb-2 mt-4"
        >
          {webSelector?.loading ? <Spinner /> : "Update"}
        </button>
      </>
    </>
  );
};

export default withAuth(index);
