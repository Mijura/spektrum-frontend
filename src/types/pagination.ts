export type PaginationData = {
	pageNumber: number
	pageSize: number
}

export const DefaultPagination: PaginationData = {
	pageNumber: 1,
	pageSize: 5,
}

export type TimeRangeData = {
	startDate: string
	endDate: string
}
