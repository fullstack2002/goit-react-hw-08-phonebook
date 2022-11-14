import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/filter/filterSlice';
import { FilterTitle, FilterInput } from "./Filter.styled";

  export const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);
  
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  }
  
  const filterId = nanoid();
  
    return (
    <div>
      <FilterTitle htmlFor={filterId}>Find contacts by name</FilterTitle>
        <FilterInput
        id={filterId}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        title="Search field"
        required
        />
    </div>
  );
};