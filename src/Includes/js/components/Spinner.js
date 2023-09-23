import RingLoader from "react-spinners/RingLoader";
import ClockLoader from "react-spinners/ClockLoader";
import MoonLoader from "react-spinners/MoonLoader";
import PulseLoader from "react-spinners/PulseLoader";
import SyncLoader from "react-spinners/SyncLoader";

const spinners = {
  RingLoader: RingLoader,
  ClockLoader: ClockLoader,
  MoonLoader: MoonLoader,
  PulseLoader: PulseLoader,
  SyncLoader: SyncLoader,
};

const Spinner = (props) => {
  const { type, color, size } = props;

  const SpinnerElement = type ? spinners[type] : spinners.RingLoader;

  return (
    <div className="loading-form">
      <SpinnerElement color={color || "#1275db"} size={size || 80} />
    </div>
  );
};

export default Spinner;
