import { G, Path, Svg } from "react-native-svg"
import { colors } from "../styles"
import { LeagueTypes, LessonTypes } from "./constants"
import { Dimensions } from "react-native"

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

export const getShieldSvgForLeague = (league: string) => {
 let color = "#635c4f";

 if (league === LeagueTypes.Bronze) {
  color = colors.grays80;
 }

 if (league === LeagueTypes.Silver) {
  color = colors.grays10;
 }

 if (league === LeagueTypes.Golden) {
  color = "#ffd900";
 }

 return (
   <Svg
     style={{ position: "absolute", bottom: 20, left: Dimensions.get("screen").width / 2 - 30}}
     viewBox="0 0 20 24"
     fill="none"
     stroke="#000000"
     width={50}
     height={50}
     strokeWidth={1.3}
   >
     <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
     <G
       id="SVGRepo_tracerCarrier"
       stroke-linecap="round"
       stroke-linejoin="round"
     ></G>
     <G id="SVGRepo_iconCarrier">
       <Path
         d="M12.0002 16C6.24021 16 5.21983 10.2595 5.03907 5.70647C4.98879 4.43998 4.96365 3.80673 5.43937 3.22083C5.91508 2.63494 6.48445 2.53887 7.62318 2.34674C8.74724 2.15709 10.2166 2 12.0002 2C13.7837 2 15.2531 2.15709 16.3771 2.34674C17.5159 2.53887 18.0852 2.63494 18.5609 3.22083C19.0367 3.80673 19.0115 4.43998 18.9612 5.70647C18.7805 10.2595 17.7601 16 12.0002 16Z"
         stroke={color}
         stroke-width="3"
       ></Path>
       <Path
         opacity="0.5"
         d="M19 5L19.9486 5.31621C20.9387 5.64623 21.4337 5.81124 21.7168 6.20408C22 6.59692 22 7.11873 21.9999 8.16234L21.9999 8.23487C21.9999 9.09561 21.9999 9.52598 21.7927 9.87809C21.5855 10.2302 21.2093 10.4392 20.4569 10.8572L17.5 12.5"
         stroke={color}
         stroke-width="3"
       ></Path>
       <Path
         opacity="0.5"
         d="M4.99994 5L4.05132 5.31621C3.06126 5.64623 2.56623 5.81124 2.2831 6.20408C1.99996 6.59692 1.99997 7.11873 2 8.16234L2 8.23487C2.00003 9.09561 2.00004 9.52598 2.20723 9.87809C2.41441 10.2302 2.79063 10.4392 3.54305 10.8572L6.49994 12.5"
         stroke={color}
         stroke-width="3"
       ></Path>
       <Path
         opacity="0.5"
         d="M12 17V19"
         stroke={color}
         stroke-width="3"
         stroke-linecap="round"
       ></Path>
       <Path
         d="M15.5 22H8.5L8.83922 20.3039C8.93271 19.8365 9.34312 19.5 9.8198 19.5H14.1802C14.6569 19.5 15.0673 19.8365 15.1608 20.3039L15.5 22Z"
         stroke={color}
         stroke-width="3"
         stroke-linecap="round"
         stroke-linejoin="round"
       ></Path>
       <Path
         opacity="0.5"
         d="M18 22H6"
         stroke={color}
         stroke-width="3"
         stroke-linecap="round"
       ></Path>
     </G>
   </Svg>
 );
}