import { colors } from "../styles"
import { LessonTypes } from "./constants"

export const getThemePrimaryColor = (lessonType: string): string => {
    if (lessonType === LessonTypes.History) {
        return colors.themePrimary
    }

    if(lessonType === LessonTypes.Ukrainian) {
        return colors.ukrainianThemePrimary
    }

    return ""
}

export const getThemeSecondaryColor = (lessonType: string): string => {
    if (lessonType === LessonTypes.History) {
        return colors.themeSecondary
    }

    if(lessonType === LessonTypes.Ukrainian) {
        return colors.ukrainianThemeSecondary
    }

    return ""
}