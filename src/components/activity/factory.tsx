import { CommentLeftActivityComponent } from "./activities/comment-left"
import { TaskCreatedActivityComponent } from "./activities/task-created"
import { TitleUpdatedActivityComponent } from "./activities/title-updated"
import { DescriptionUpdatedActivityComponent } from "./activities/description-updated"
import { StartedWorkActivityComponent } from "./activities/started-work"
import { FinishedWorkActivityComponent } from "./activities/finished-work"
import { Activity, ActivityType } from "@jigjoy-io/task-contracts"
import { JSX } from "react"

export function getActivityComponent(activity: Activity): JSX.Element {
	switch (activity.type) {
		case ActivityType.COMMENT_LEFT:
			return <CommentLeftActivityComponent activity={activity} />
		case ActivityType.TASK_CREATED:
			return <TaskCreatedActivityComponent activity={activity} />
		case ActivityType.TITLE_UPDATED:
			return <TitleUpdatedActivityComponent activity={activity} />
		case ActivityType.DESCRIPTION_UPDATED:
			return <DescriptionUpdatedActivityComponent activity={activity} />
		case ActivityType.STARTED_WORK:
			return <StartedWorkActivityComponent activity={activity} />
		case ActivityType.FINISHED_WORK:
			return <FinishedWorkActivityComponent activity={activity} />
		default:
			return <></>
	}
}
