import { Store } from 'react-notifications-component';
import { Movie, Person, Tv } from './Types';

export const getFile = async (filepath: string) => {
  // prefix public dir files with `process.env.PUBLIC_URL`
  // see https://create-react-app.dev/docs/using-the-public-folder/
  const res = await fetch(`${process.env.PUBLIC_URL}/${filepath}`);

  // check for errors
  if (!res.ok) {
    throw res;
  }

  return res.text();
}

export const isPerson = (item: Person | Movie | Tv): item is Person => item.type === "person"

const errorMessage = (message: string) => {
    Store.addNotification({
        title: "Error!",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
}

const apiKey = "73c9eb36754467308921192919754214";
const defaultImage = "https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg";

export { errorMessage, apiKey, defaultImage };