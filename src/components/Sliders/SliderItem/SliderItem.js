import { InputNumber, Slider} from "antd";
import styles from './SliderItem.module.css'
import {useDispatch} from "react-redux";
import {calculatePrice, setSliderValue} from "../../../store/calculatorSlice";

const marks = {
  0: '0',
  1000: '1000'
}

export const SliderItem = ({title, mark, value}) => {
  const dispatch = useDispatch()

  // const [inputValue, setInputValue] = useState(0);
  const onChange = (value) => {
    dispatch(setSliderValue({type: mark, value}))
    dispatch(calculatePrice())
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.sliderWrapper}>
        <Slider
          className={styles.slider}
          marks={marks}
          min={0}
          max={1000}
          onChange={onChange}
          value={typeof value === 'number' ? value : 0}
        />

        <InputNumber
          min={0}
          max={1000}
          style={{
            margin: '0 16px',
          }}
          value={value}
          onChange={onChange}
        />


      </div>
    </div>
  )
}