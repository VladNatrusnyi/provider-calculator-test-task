import styles from './Sliders.module.css'
import {SliderItem} from "./SliderItem/SliderItem";
import {useSelector} from "react-redux";
export const Sliders = () => {

  const storage = useSelector(state => state.calculator.storage)
  const transfer = useSelector(state => state.calculator.transfer)

  return (
    <div className={styles.sliderSection}>
      <SliderItem title='Storage, GB' mark='storage' value={storage}/>
      <SliderItem title='Transfer, GB' mark='transfer' value={transfer}/>
    </div>
  )
}