import vid from "../../assets/main-video.mp4";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <>
      <div className={classes["video-widget"]}>
        <video width={"320"} height={"240"} autoPlay muted loop>
          <source src={vid}></source>
        </video>
      </div>
    </>
  );
}

export default Hero;
