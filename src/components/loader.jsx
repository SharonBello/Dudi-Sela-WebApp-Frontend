import ReactLoading from "react-loading"

export const Loader = () => {
    return (
        <div className="loader" style={{
                position: "fixed",
                left: "30%",
                top: "50%",
                zIndex: '10000 !important',
                width: '500px',
                height: '500px'
        }}>
            <ReactLoading type={"spin"} color="#C9DB39" height={'20%'} width={'20%'} />
        </div>
    )
}