import { CommentLeftActivity } from "./activities/comment-left"
import { TaskCreatedActivity } from "./activities/task-created"
import { ActivityData } from "../../types/activity"
import { JSX } from "react"
import { TitleUpdatedActivity } from "./activities/title-updated"
import { DescriptionUpdatedActivity } from "./activities/description-updated"
import { StartedWorkActivity } from "./activities/started-work"
import { FinishedWorkActivity } from "./activities/finished-work"

export function getActivityComponent(activity: ActivityData): JSX.Element {
	switch (activity.type) {
		case "CommentLeft":
			return <CommentLeftActivity activity={activity} />
		case "TaskCreated":
			return <TaskCreatedActivity activity={activity} />
		case "TitleUpdated":
			return <TitleUpdatedActivity activity={activity} />
		case "DescriptionUpdated":
			return <DescriptionUpdatedActivity activity={activity} />
		case "StartedWork":
			return <StartedWorkActivity activity={activity} />
		case "FinishedWork":
			return <FinishedWorkActivity activity={activity} />
		default:
			return <></>
	}
}
