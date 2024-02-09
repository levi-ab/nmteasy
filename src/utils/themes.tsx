import { colors } from "../styles"
import { LessonTypes } from "./constants"

export const getThemePrimaryColor = (lessonType: string): string => {
    if (lessonType === LessonTypes.History) {
        return colors.historyThemePrimary
    }

    if(lessonType === LessonTypes.Ukrainian) {
        return colors.ukrainianThemePrimary
    }

    if(lessonType === LessonTypes.Biology) {
        return colors.themePrimary
    }

    return ""
}

export const getThemeSecondaryColor = (lessonType: string): string => {
    if (lessonType === LessonTypes.History) {
        return colors.historyThemeSecondary
    }

    if(lessonType === LessonTypes.Ukrainian) {
        return colors.ukrainianThemeSecondary
    }

    if(lessonType === LessonTypes.Biology) {
        return colors.themeSecondary
    }

    return ""
}