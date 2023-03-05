import ReactLoading from "react-loading"

export const Loader = () => {
    return (
        <div className="loader" style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "transform(-50%, -50%)",
        }}>
            <ReactLoading type={"spin"} color="#C9DB39" height={'20%'} width={'20%'} />
        </div>
    )
}
