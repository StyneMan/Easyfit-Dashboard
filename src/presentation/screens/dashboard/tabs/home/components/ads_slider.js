import { Card, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

const AdsSlider = () => {
  const { adsData } = useSelector((state) => state.cms);

  return (
    <Card style={{ height: 256 }} elevation={4}>
      <Typography>Adverts</Typography>
      {adsData && (
        <Carousel
          autoPlay={true}
          animation={"fade"}
          indicators={false}
          interval={5000}
          duration={500}
          navButtonsAlwaysVisible={false}
          navButtonsAlwaysInvisible={true}
          // next={(next, active) => setActiveIndex(active)}
          // prev={(next, active) => setActiveIndex(active)}
          // NavButton={({ onClick, className, style, next, prev }) => {
          //   return (
          //     <>
          //       <Button
          //         id={btnNextId}
          //         hidden={true}
          //         onClick={onClick}
          //         className={className}
          //         style={(style, { display: "none" })}
          //       >
          //         {next && ""}
          //       </Button>

          //       <Button
          //         id={btnPrevId}
          //         hidden={true}
          //         onClick={onClick}
          //         className={className}
          //         style={style}
          //       >
          //         {prev && ""}
          //       </Button>
          //     </>
          //   );
          // }}
        >
          {adsData?.map((item, i) => (
            <div key={i}>
              <img src={item?.banner} alt="" width="100%" />
            </div>
          ))}
        </Carousel>
      )}
    </Card>
  );
};

export default AdsSlider;
