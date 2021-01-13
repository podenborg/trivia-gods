// import {} from 

// export default function Checkmark({ question }: QuestionProps) {
//   return (
//     <View>
//       <Text style={styles.questionPrompt}>
//         {he.decode(question.question)}
//       </Text>

//       <View style={styles.answerItemGrid}>
//         {/* TO DO: Render with FlatList component */}
//         {Array.from([question.correct_answer, ...question.incorrect_answers]).map((answer: string, index: number) => {
//           return (
//             <AnswerItem index={index} key={`question-${index}`}>
//               {he.decode(answer)}
//             </AnswerItem>
//           );          
//         })}
//       </View>
//     </View>
//   );
// }