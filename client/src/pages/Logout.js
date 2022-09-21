async function delay() {
    await new Promise (resolve => setTimeout(resolve, 2000));
    window.location.href = "/";
}

function Logout() {
    delay();
    return (
    <div>
        <br></br>
        <h3>Successfully logged out!</h3>
    </div>
)}

export default Logout;