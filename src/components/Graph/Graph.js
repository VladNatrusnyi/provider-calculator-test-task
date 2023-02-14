import styles from './Graph.module.css'
import {GraphItem} from "./GraphItem/GraphItem";
import { Radio } from 'antd';
import {calculatePrice, setBunnyType, setScalewayType} from "../../store/calculatorSlice";
import {useDispatch, useSelector} from "react-redux";

export const Graph = () => {
  const dispatch = useDispatch()

  const bunnyType = useSelector(state => state.calculator.bunnyType)
  const scalewayType = useSelector(state => state.calculator.scalewayType)

  const resultData = useSelector(state => state.calculator.result)

  const minKey = Object.keys(resultData).reduce((a, b) => resultData[a] < resultData[b] ? a : b);
  const maxValue = Math.max(...Object.values(resultData));


  const objOfParams = Object.keys(resultData).map(item => {
    return {
      [item]: {
        width: (resultData[item] * 100) / maxValue,
        color: item === minKey ? 'red' : 'gray',
        title: item,
        price: resultData[item],
      }
    }
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {});



  const onChangeBunny = (e) => {
    dispatch(setBunnyType(e.target.value))
    dispatch(calculatePrice())
  };

  const onChangeScaleway = (e) => {
    dispatch(setScalewayType(e.target.value))
    dispatch(calculatePrice())
  };

  return (
    <div className={styles.graphSection}>
      <div className={styles.graphWrapper}>

        <GraphItem params={objOfParams.backblaze}/>

        <GraphItem params={objOfParams.bunny} >
          <Radio.Group
            className={styles.radioGroup}
            size="small"
            onChange={onChangeBunny}
            value={bunnyType}
          >
            <Radio style={{ fontSize: 12}} value={"HDD"}>HDD</Radio>
            <Radio style={{ fontSize: 12}} value={"SSD"}>SSD</Radio>
          </Radio.Group>
        </GraphItem>

        <GraphItem params={objOfParams.scaleway} >
          <Radio.Group
            className={styles.radioGroup}
            size="small"
            onChange={onChangeScaleway}
            value={scalewayType}
            style={{
              fontSize: 12
            }}
          >
            <Radio style={{ fontSize: 12}} value={"Multi"}>Multi</Radio>
            <Radio style={{ fontSize: 12}} value={"Single"}>Single</Radio>
          </Radio.Group>
        </GraphItem>

        <GraphItem params={objOfParams.vultr}/>

      </div>

    </div>
  )
}