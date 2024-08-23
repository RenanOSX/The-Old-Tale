import logo from "../../assets/logo.png";

export default function Header({title, description, image=logo}) {
    return(
        <header>
            <h1>{title}<img src={image} alt={description}/></h1>
            <p>
            {description}
            </p>
        </header>
    );
}