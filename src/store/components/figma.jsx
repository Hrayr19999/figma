import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./figmaSlice";
import "@wix/design-system/styles.global.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect } from "react";
import { Table, Box, Layout, Cell, Text, Image } from "@wix/design-system";
import totalImgBlue from "../components/figmaImg/Frame.png";
import totalImgRed from "../components/figmaImg/FrameRed.png";
import "./index.css";

function getPrimitiveKeys(obj) {
    return Object.entries(obj).filter(([key, values]) => typeof values !== "object" || values === null);
}

function Figma() {
    const { data, loading } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData("https://calendarapi.boomtechdev.com/calendars/x/data"));
    }, [dispatch]);

    return (
        <div>
            {loading && (
                <div className="loaderWrapper">
                    <div className="loader"></div>
                </div>
            )}
            {data && (
                <div>
                    {/* iventz */}
                    <div className="iventz">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25%" height="50px" viewBox="0 0 310 50" fill="none">
                            <path
                                d="M8.73832 24.3455H31.3785V26.2654H8.73832V24.3455ZM18.6682 8.59375H31.3785V10.4264H18.6682V8.59375ZM8.73832 39.5301H21.1467V41.3625H8.73832V39.5301Z"
                                fill="#6B3FA0"
                            />
                            <path
                                d="M91.7277 8.59375L75.9427 41.4062L67.6509 24.6946L59.581 41.4062L43.2634 8.59375H45.0373L59.581 37.2174L66.6754 22.7747L59.581 8.59375H61.4431L67.6064 20.8548L73.5925 8.59375H75.4105L68.5819 22.7311L75.9427 37.2174L89.9542 8.59375H91.7277Z"
                                fill="#5B5CA2"
                            />
                            <path
                                d="M125.499 8.59375V10.4264H107.009V24.3455H123.016V26.2654L107.009 26.2218V39.5301H125.499V41.3625H105.147V8.59375H125.499Z"
                                fill="#4C79A4"
                            />
                            <path
                                d="M140.923 41.3625V8.63739L166.774 36.3447V8.63739H168.724V41.3625L142.785 13.3062V41.3625H140.923Z"
                                fill="#3C95A5"
                            />
                            <path d="M192.439 41.3625V10.4264H179.846V8.59375H206.894V10.4264H194.301V41.3625H192.439Z" fill="#2DB2A7" />
                            <path
                                d="M217.973 8.75763L242.493 39.3899H218.55V41.2043H246.262L221.742 10.5722H245.552V8.75763H217.973Z"
                                fill="#1DCFA9"
                            />
                        </svg>
                    </div>
                    <div>
                        {/* total */}
                        <Box verticalAlign="space-between" direction="vertical" height="100%">
                            <Layout cols={1}>
                                <Layout>
                                    {getPrimitiveKeys(data).map(([key, values], i) => {
                                        console.log(data);
                                        return (
                                            <Cell span={3} className="total">
                                                <Text size="medium">
                                                    <p style={{ paddingBottom: "20px" }}>
                                                        {i === 0
                                                            ? "Total Users"
                                                            : i === 1
                                                            ? "Total Calendars"
                                                            : i === 2
                                                            ? "Total Events"
                                                            : "Total Tickets"}
                                                    </p>
                                                    <Text weight="bold">{values}</Text>
                                                    <Text size="tiny">
                                                        <div className={i % 2 === 0 ? "totalValues" : "totalValues1"}>
                                                            {i % 2 === 0 ? (
                                                                <Image src={totalImgBlue} width="12px" height="12px" />
                                                            ) : (
                                                                <Image src={totalImgRed} width="12px" height="12px" />
                                                            )}
                                                            48.8%
                                                        </div>
                                                    </Text>
                                                </Text>
                                            </Cell>
                                        );
                                    })}
                                </Layout>
                            </Layout>
                        </Box>
                    </div>
                    {/* diagram  */}
                    <div className="diagram">
                        <Text weight="normal" size="medium" className="performance">
                            Performance
                        </Text>
                        <Box verticalAlign="space-between" direction="vertical" height="100%" padding="10px">
                            <Layout cols={1} gap="20px">
                                <Layout className="series">
                                    {data.chartData.series.map((item, i) => {
                                        return (
                                            <Cell span={3}>
                                                <div key={i} style={{ borderLeft: item.color + " solid ", paddingLeft: "10px" }}>
                                                    <Text size="medium">
                                                        {i === 0 ? "New" : i === 1 ? "Upgraded" : i === 2 ? "Downgraded" : "Deleted"}
                                                    </Text>
                                                    <Text weight="bold">
                                                        <p>{item.data[0]}</p>
                                                    </Text>
                                                </div>
                                            </Cell>
                                        );
                                    })}
                                </Layout>
                                <HighchartsReact highcharts={Highcharts} options={data.chartData} />
                            </Layout>
                        </Box>
                    </div>
                    {/* table */}
                    <div>
                        {
                            <div className="table">
                                <Text weight="normal" size="medium">
                                    <p className="users">Users</p>
                                </Text>
                                <Table
                                    skin="standard"
                                    data={data.users}
                                    columns={[
                                        { title: "Users", ArrowDownSmall: true, render: (row) => row.name, sortDescending: true },
                                        { title: "Registration Date", render: (row) => row.registrationDate },
                                        { title: "Cancelation Date", render: (row) => row.cancelationDate },
                                        { title: "Plan", render: (row) => row.Plan },
                                        { title: "Calendar Cuanity", render: (row) => row.calendarQuantity },
                                        { title: "Events Cuanity", render: (row) => row.eventsQuantity },
                                        { title: "Tickets Quantity", render: (row) => row.ticketsQuantity },
                                    ]}
                                />
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
export default Figma;
