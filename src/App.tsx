import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import RepositoryForm from "./components/RepositoryForm/RepositoryForm";
import RepositoryLinks from "./components/RepositoryLinks/RepositoryLinks";

const App: React.FC = () => {
    return (
        <div className="container">
            <header>
                <RepositoryLinks />
                <RepositoryForm />
            </header>
            <KanbanBoard />
        </div>
    );
};

export default App;
