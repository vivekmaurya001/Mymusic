import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, message } from "antd";
import { Input, Space } from "antd";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;
const { Search } = Input;

const SearchPage = () => {
  const [Loading, setLoading] = useState(false);
  const [Downloading, setDownloading] = useState(false);
  const [SongList, setSongList] = useState({
    SongArray: [
      "Baby",
      "Clean Baby Sleep White Noise (Loopable)",
      "Baby Doll",
      "Baby By Me",
      "Babydoll",
      "Baby Shark",
      "Baby Don't Hurt Me",
      "Baby Shark",
    ],
    imgSrc: [
      "https://i.scdn.co/image/ab67616d00004851629dc9e2e3bc20bbd7d92e4a",
      "https://i.scdn.co/image/ab67616d00004851f036cfd075904b4e8445877c",
      "https://i.scdn.co/image/ab67616d0000485187b32c2a464cd54ec95d301e",
      "https://i.scdn.co/image/ab67616d000048515fcaf37050baf451d34570f6",
      "https://i.scdn.co/image/ab67616d000048517b1b6f41c1645af9757d5616",
      "https://i.scdn.co/image/ab67616d0000485111723f2867f29b2134ae47e4",
      "https://i.scdn.co/image/ab67616d000048510b4ef75c3728599aa4104f7a",
      "https://i.scdn.co/image/ab67616d000048514a98c14e3f802b3a2357ce23",
    ],
    NewSingerArray: [
      "",
      "Justin Bieber, Ludacris",
      "Dream Supplier, Baby Sleeps, Background White Noise",
      "Meet Bros Anjjan, Kanika Kapoor",
      "E",
      "50 Cent, Ne-Yo",
      "Dominic Fike",
      "Pinkfong",
      "David Guetta, Anne-Marie, Coi Leray",
      "CoComelon",
      "The Ronettes",
      "Raftaar",
      "Baby Keem, Kendrick Lamar",
      "Guru Randhawa, Dhvani Bhanushali",
      "Drake, Sexyy Red, SZA",
      "Ari Abdul",
      "Father John Misty",
      "Isabel LaRosa",
      "Lana Del Rey",
      "Rema, Selena Gomez",
      "Lil Baby",
    ],
  });
  const onSearch = async (value, _e, info) => {
    if (!value) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api", {
        search: value,
      });
      setLoading(false);
      console.log(response.data);
      setSongList(response.data);
    } catch (error) {
      console.error("Error fetching screenshot:", error);
      setLoading(false);
    }
  };
  const downLoadFxn = async (value) => {
    if (!value) return;
    message.loading("Downloading");
    setDownloading(true);
    try {
      const response = await axios.post("http://localhost:3001/download", {
        name: value,
      });
      setDownloading(false);
      message.success(`Downloaded Succesfully`);
    } catch (error) {
      console.error("Error fetching screenshot:", error);
      setDownloading(false);
      message.error(`Downloading Failed`);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "3rem",
      }}
    >
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        loading={Loading}
        onSearch={onSearch}
      />
      {SongList.SongArray.map((song, index) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <Flex gap={"middle"}>
                <b>{index + 1}</b>
                <Avatar
                  src={SongList.imgSrc[index]}
                  shape="square"
                  size="large"
                  icon={<UserOutlined />}
                />
                <div>
                  {" "}
                  <b>{SongList.SongArray[index]}</b> <br />
                  <p style={{ color: "grey" }}>
                    {SongList.NewSingerArray[index]}
                  </p>
                </div>
              </Flex>
              <Button
                disabled={Downloading}
                style={{ textAlign: "right" }}
                type="primary"
                icon={<DownloadOutlined />}
                size={"large"}
                onClick={() => downLoadFxn(SongList.SongArray[index])}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default SearchPage;
