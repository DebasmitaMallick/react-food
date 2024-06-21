import React from "react";
import { MealItem } from "./MealItem";
import useHttp from "../hooks/useHttp";
import { Error } from "./Error";

/**
 * we are declaring this config object outside the component function, otherwise
 * this would create an infinite loop when this component have rerendered again after the data was fetched, thus creating an new config object,
 * resulting in rerendering the sendRequest callback function in useHttp hook
 */
const requestConfig = {};
export const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  return (
    <>
      {isLoading ? (
        <p className="center">Fetching meals...</p>
      ) : error ? (
        <Error title="Failed to fetch meals." message={error} />
      ) : (
        <ul id="meals">
          {loadedMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </>
  );
};
