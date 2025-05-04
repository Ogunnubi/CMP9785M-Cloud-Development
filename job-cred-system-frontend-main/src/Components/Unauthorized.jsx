import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="section">
            <div className="container">
                <div className="row align-items-center">    
                    <div className="col-lg-6">
                        <h1>Unauthorized</h1>
                        <br />
                        <p>You do not have access to the requested page.</p>
                        <div className="flexGrow">
                            <button onClick={goBack}>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Unauthorized