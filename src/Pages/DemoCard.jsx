import DemoImage from "../assests/images/yoga_demo_image.jpeg"

const DemoCard = () => {
    return (
        <>
            <div className="demo-card-main-container">
                <div className="demo-card-main">
                    <div className="demo-card-img-div">
                        <img src={DemoImage} alt="image" className="demo-card-img" />
                    </div>
                    <p className="inline-block demo-card-title-text">{"Discover Your Inner Peace"}</p>
                    <h6 className="demo-card-h6">{"Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation"}</h6>
                </div>
            </div>
        </>
    )
}

export default DemoCard;