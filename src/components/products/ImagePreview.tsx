import styles from '../../assets/styles/style.module.css';
import { ImagePreviewProps } from '../../../types/propsType';

const ImagePreview = (props: ImagePreviewProps): JSX.Element => {
    return (
        <div
            className={styles.pMediaThumb}
            onClick={() => props.delete(props.id)}
        >
            <img src={props.path} alt="プレビュー画像" />
        </div>
    );
};

export default ImagePreview;
