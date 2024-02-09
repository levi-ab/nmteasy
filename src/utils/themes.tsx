import { colors } from "../styles"
import { LeagueTypes, LessonTypes } from "./constants"

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

export const getColorForPlace = (index: number) => {
  if (index === 0) {
    return colors.gold;
  }

  if (index === 1) {
    return colors.grays20;
  }

  if (index === 2) {
    return colors.historyThemeSecondary;
  }

  return colors.grays40;
};

export const getColorForLeague = (league: string) => {
    if (league === LeagueTypes.Wooden) {
        return colors.wooden;
      }
    
      if (league === LeagueTypes.Bronze) {
        return colors.bronze;
      }
    
      if (league === LeagueTypes.Silver) {
        return colors.grays40;
      }
    
      if (league === LeagueTypes.Golden) {
        return colors.gold;
      }

      return ""
}
  