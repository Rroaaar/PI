export default function (inputs) {

    const errors = {
        name: "",
        platforms: "",
        releaseDate: "",
        description: "",
        rating: "",
        genres: "",
        background_image: ""
    };
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(inputs.name) && !inputs.name) {
        errors.name = "Enter a valid name. Special characters are not allowed.";
    }
    if (!inputs.platforms) {
        errors.platforms = "Select at least one platform"
    }
    if (!(inputs.releaseDate && parseInt(inputs.releaseDate.substring(6)) > 1949)) {
        console.log(parseInt(inputs.releaseDate.substring(6)))
        errors.releaseDate = "enter a release date"
    }
    if (!inputs.description) {
        errors.description = "enter a description"
    }
    if (!(inputs.rating <= 5 && inputs.rating > 0)) {
        errors.rating = "enter a valid rating"
    }
    if (!(inputs.background_image)) {
        errors.background_image = "Enter a image"
    }
    return errors
}