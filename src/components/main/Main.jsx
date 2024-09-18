import './Main.scss';
import FiltersBlock from './filters/FiltersBlock';
import ListBlock from './list/ListBlock';
function Main() {
  return (
    <div className="main">
        <FiltersBlock />
        <ListBlock/>
    </div>
  );
}

export default Main;
