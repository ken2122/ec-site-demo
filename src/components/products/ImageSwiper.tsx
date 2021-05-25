import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { useState } from 'react';
import styles from '../../assets/styles/style.module.css';
import { Image } from '../../../types/index';

const ImageSwiper = (props: { images: Image[] }): JSX.Element => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });

    const images = props.images;

    return (
        <Swiper {...params}>
            {images.length === 0 ? (
                <div className={styles.pMediaThumb}>
                    <img src="/img/src/no_image.png" alt="No Image" />
                </div>
            ) : (
                images.map((image) => (
                    <div className={styles.pMediaThumb} key={image.id}>
                        <img src={image.path} alt="商品画像" />
                    </div>
                ))
            )}
        </Swiper>
    );
};
export default ImageSwiper;
