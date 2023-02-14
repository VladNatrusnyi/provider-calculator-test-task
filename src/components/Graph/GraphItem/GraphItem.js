import styles from './GraphItem.module.css'
import {useWindowDimensions} from "../../../customHooks/useWindowDimensions";

export const GraphItem = ({children, params}) => {

  const { width, height } = useWindowDimensions();

  const direction = width <= 600 ? 'height' : 'width'

  return (
    <div className={styles.item}>
      <div className={styles.itemTextWrap}>
        <div className={styles.itemText}>
          {params.title}
          <div>
            {children}
          </div>
        </div>
        <div className={styles.itemIcon}>
          <img src={require(`./../../../assets/img/${params.title}.png`)} alt="graphImg"/>
        </div>
      </div>

      <div className={styles.lineWrap}>
        <div
          className={styles.line}
          style={{
            [direction]: `${params.width}%`,
            background: `${params.color}`,
            [direction === 'width' ? 'height' : 'width']: '18px'
          }}
        ></div>
        <div className={styles.lineText}>{Math.round(params.price * 100) / 100 }$</div>
      </div>
    </div>
  )
}