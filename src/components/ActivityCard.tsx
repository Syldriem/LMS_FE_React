import { ReactElement, useContext } from "react";
import "../css/ActivityCard.css";
import { IActivity } from "../utils";
import { Button } from "react-bootstrap";
import { ApiDataContext } from "../context/ApiDataProvider";

interface IActivityProps {
    activity: IActivity | null;
}

export function ActivityCard({ activity }: IActivityProps): ReactElement {
    if (!activity) {
        return <p>Activity data is unavailable.</p>; 
    }
    
    const { deleteActivity } = useContext(ApiDataContext);

    const formattedStartDate = new Date(activity.start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const formattedEndDate = new Date(activity.end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const handleDelete = async (activityId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
        if (confirmDelete) {
            try {
                await deleteActivity(activityId); // Ensure deleteActivity returns a promise
                console.log(activity)
                alert("Activity deleted successfully."); // Optional feedback to the user
            } catch (error) {
                console.error("Error deleting activity:", error);
                alert("Failed to delete the activity."); // Error feedback
            }
        }
    };

    return (
        <span className="card-base">
            <p className="title-card-src-a">{activity.name}</p>
            <div className="desc">
                <p className="cat-lbl-a">Description:</p>
                <p className="spec-lbl">{activity.description}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl-a">Start Date:</p>
                <p className="spec-lbl">{formattedStartDate}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl-a">End Date:</p>
                <p className="spec-lbl">{formattedEndDate}</p>
            </div>
            <Button
                className="btn btn-danger btn-sm ms-2"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent click events
                    handleDelete(activity.id); // Call the delete function
                }}
            >
                Delete
            </Button>
        </span>
    );
}
