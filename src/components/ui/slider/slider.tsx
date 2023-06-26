import styles from './slider.module.css';

interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({ value, min, max, handleChange }: SliderProps) => {
  return (
    <div className={styles.sliderContainer}>
      <input
        type='range'
        min={min || 0}
        max={max || 100}
        value={value}
        onChange={handleChange}
      />
      <div>{value}</div>
    </div>
  );
};

export default Slider;
