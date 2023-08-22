// Array.from(document.querySelectorAll('.segment-text')).map(element => element.textContent).join(' ')

// use this to get access of youtube transcript;
//const title= document.querySelector('.ytp-title-link').textContent
// let duration=document.querySelector('.ytp-time-duration').textContent

const transcript=`Hello ji, How are you all? This is love babbar and welcome to the channel CodeHelp This is our lecture number 23, over here we are going to talk about mathematics for DSA If I know some mathematical concept in DSA I will benefit from it I will also face an error called, time limit exceeded if I know these concept from first, If I know about this I will be saved from TLE and write an optimized code and pass all the test case so this the last video of phase 1, after this we will start with phase 2, where we will learn about pointer, recursion and dynamic allocation at present we have to focus on mathematics we are going to learn many good concepts, I will give you a lot of homework, be ready for hard work we will start with prime numbers come on! so I told you we will start with prime numbers we will do warm once, we have already written code of prime number earlier you have got n in input and in output you have to say whether it is a prime number or not we have done the code earlier? yes we have done suppose you are given 10 in input so what you were doing? 1 to 10 we were using all the number from 1 to 10, we were dividing n i.e. 10 with all these numbers i is from 2 to 9 if we get ==0 somewhere, then it is not prime if we have a opposite case i.e we did not get equal to 0 anywhere, then it is a prime number this we had learned if you want to see the code, I can show you you will remember, that we had done something like this for(int i=2; i this was the code if you remember, we had also made a flowchart for this, we will run it and see we asked to check for 5, we got the answer, 5 is a prime number now check 15, 15 is not a prime number check 1, 1 is a prime number so we will have to add a base case over here, what will be the base case, simple. if(n<1) { return false; } if the number is less then 1 it will not be a prime number, 1 not a prime number, 0 not a prime number we entered 2-> prime number, we entered 3-> prime number we entered 5-> prime number we entered 99999-->not a prime number we understood what we are doing, that if I am given n, what do I do is that I just divide n from 2 to <n and I check if my reminder =0, if I get it, then not prime here it will be n instead of 10 that is your input if you did not get 0 then it is prime this logic we have written over here OK, so now what is its complexity? see carefully we are executing one loop from 2 to n so what is its complexity? how many times you are going to enter the loop? nearly we will enter n-2 times,O(n-2) is O(n) so your complexity is O(n), so if you want to check whether any number is prime number or not then your complexity will be O(n), n is the number itself to be checked can I improve my approach, can I optimize this? OK, that we will come to know, we use our brains first we will do the question and see this video is sponsored by Crio, the world's leading project driven platform if our target is to get a good job we are working on problem solving and DSA in these series along with that if you want to be strong in development also, then Crio is the place for you In Crio you will get different programs, like full stack program, back-end development program and the grade of program is like internship level you are going to do things practically over here at the end of each program you will be having so many projects that your resume will be very strong not only that, over here there is a fellow ship program also, in which you get guarantee of placement you will be placed in a product based company all the programs come with 1 week of free trial and you will also get assured scholarship, so you will get a link in description, you can avail maximum available discount, you will also get assured scholarship you will get a link in the description , you can see a coupon code, by using this you can get maximum discount benefits and this applies to all the programs. thank you we have one question, we have an integer, we have to return the number of prime numbers that are strictly less than n we have to give the count and how many prime number are less than the given number if we are given n as 15 than we have to check how many total prime numbers exist between 1 to 15, and return the count so, this we have understood. so now we will start to write the code it is very simple, we have to check how many prime number exist, we know that first prime number will start from 2 so we will start the loop from 2, for(int i=2; i if(isPrime(i)) { cnt++;} return cnt; now we have to write a function isPrime() to check if a particular number is prime or not we will write that bool isPrime(int n), I can see over here, we have just written the code, so will copy that and paste it so this way you have written this code and we will run it once and see, if it working properly or not we have executed it, it is correct, now we will try with all the test case it is working properly, very good what is the maximum value of n, we will check it in this case first with 0, 5 to 50,00,000 can be your maximum value I have written 5, if this is working properly than our logic is correct, there is no problem in code and logic but as expected TLE is causing an issue now, I have to find such a solution, which is with good complexity and this is difficult, over here we are checking for each and every number, so our complexity is very high see I will explain it to you what has happen over here, you checked it once for 2 that it a prime number or not due to that, there is some complexity I can say you might have done 2 comparison total you might have gone up to 2, in worst case now for number 3, whole process is done 3 times, for 4 it is done 4 times following the same process for n also you will go up to n so in short you can see the n square(n2) complexity O(n2) is your complexity, n is your input fine, i case of n square, it will be 10 to the power 12, and machine can only perform 10 to the power 8 computation in one second So, TLE will create an issue, we knew that so lets understand how can we optimize this now we will see a algorithm for this which is know as "Sieve of Eratosthenes", may I am not pronouncing it properly or there is a spelling mistake, but this way it write it we should clear the test case, that is more important we will do that so what do we know that we have to find all such numbers, which are prime numbers and strictly less than n so we know that we not exceed n, we have to look before only, and give me the count we said OK, it will be done I will show you one thing first, to which you will also agree that it is correct what do we know is that a prime number should only come it the table of that number only, there should be no number that can be divisible by that number now if say that n=40, and I have to find how many prime numbers exist before 40 we will count it once , to explain you in a better way, we will write 1 to 40 we do not consider 1, we always start out loop from 2 and we will also not consider 40 because it is told less than 40 so we are left with this much space, we have to consider this much space and find out the solution first of all we checked, first we had assumed that all the number are prime number so we have marked every number as a prime number all the numbers are prime number now we will go on cutting, just see how when I cam on 2, I have supposed that 2 is a prime number because I already assumed it, but all the numbers that come the table of 2, mark them as non-prime so what it do, 4, 6,8,10,12,14,16,18,20 22,24,26,28, 30, 32,34,36,38, so all these numbers are now marked ad non prime I will adjust my hairs, so all these numbers are marked as non-prime, very good so we came to know that at least 2 is a prime number, now lets move ahead now for 3, 3 is a prime number, but all the numbers that are coming in the table of 3 are non-prime we marked 6, 9,12,15,18,21,24,27,30,33,36,39, are non-prime now next number is 5, 5 is prime, but all the numbers coming the table of 5 are non-prime so cut 10, 15, 20,25,30,35,40 we move forward, 7 is prime number, but all the numbers coming in the table of 7 are non-prime so cut 14,21,28, 35 now again we moved forward, 11 is prime number, but all the numbers coming in the table of 11 are non-prime so we can cut 22, 33, very good now we moved forward, now 13 is  a prime number, but the numbers coming the table of 13 are non-prime so cut 26 and 39 now 17 is a prime number, but number coming  in its table 34 is non-prime 19 is a prime number, but 38 is non-prime 23 is a prime number, 46 is not in the range next 29 is a prime number, but 58 is non-prime next 31 is a prime number, 37 is also a prime number, so how many prime numbers are less than 40 so the output will be 12 so you have understood , t=you have understood the approach that we have to mark all the numbers as prime number and the numbers which are coming i the table mark them as non-prime, we have to do this simple work it was "Sieve of Eratosthenes" it was very simple game we will implement it once and see, that it is really simple so, will restart it once now I will start writing the code, code is very easy int cnt=0; vector prime(n+1, true); now 0 and 1 are non-prime number so, I will update it prime[0]=prime[1]=false; for(int i=2;i return cnt; now lets execute it once and see I said execute it once, run code, normal case, this is empty, run example desk, run this, executed, what is worst case? what is the H case? 5*10 to the power of k,  run this once 5000000, last time we had got TLE, now lets see executed properly, fine so we seen up to now, we created one array vector, where we have marked all the numbers true we have marked 0 and 1 as false, as they are not prime number then start from 2 and go up to less than n check each and every number if the current number a prime number? if yes, than cnt++, and numbers occurring in that numbers table should  see carefully, we started from 2*i and incremented i, so we have marked all the numbers occurring in that number as non-prime we had learned that only in algorithm,we have implemented that only and our game is solved, this way we submit it, and our answer came, this way we have solved it, this is know as "Sieve of Eratosthenes" this has got a lot of air in market, CP people know this very well, they make macro of this and roam around if you see the code of any CP person, you will get code written in a macro this is one thing of which I was very afraid, " Sieve of Eratosthenes" I was not able to understand, but now things are very simple, you will also understand everything as time passes that there was nothing to be afraid of, you will get such vibe now see this carefully, I will explain you its complexity if you look carefully, if total number of element is n, n is total number of element 1 to 40 first you marked all the numbers that occur in the table of 2 this is prime and remaining are non-prime so total how many numbers they were? n/2 number then you moved on to 3, you marked all the numbers that occur in table of 3 as non-prime, n/3 numbers in the same you did for 5, 7,11, this way it was going on so these are the total number of iteration or comparison n is common, (1/2+1/3+1/5+1/7+1/11+....) you will move forward and see that it a harmonic progression of prime number H.P of prime number fine? so when we solve this we get O(n*(log(log n)), this is your complexity, this is how you calculate time complexity O(n*log(log n)), how did you get this? it is very simple, you had might have learned in B Tech about Taylor's series, revise it once, you will understand it why we will not discuss this in depth, because no one will ask you how this is calculated still just see it once, how you will solve Taylor's series, you will benefit from that done? we have understood this, we calculated the time complexity, and also we have done code of "sieve" now I will ask you to some homework, you will have to use your brain, do not take tension, even if you require 2 hours take it and solve it what is the homework you have to code Segmented Sieve this you have to do, fine, this is your homework let us move ahead next is GCD, what is GCD, I will say you have already studied this in your childhood GCD, Greatest Common Divisor, you will say I have not studied, do not tell lies, I will ask have you studied HCF? Highest Common Factor, it is the same So what was HCF? If I had 2 numbers, a and b, what is HCF or GCD, the highest number which perfectly divides these 2 numbers, is factor of both of them maximum factor o both that can divide both the number and bring 0 as remainder, understood? suppose if I talk about 24 and 72, what will be HCF? how we use to calculate i our childhood, I will show you 24=2*2*, I will explain you  as we used to do in childhood 24,12,6,3,1 and 74,36,18,9,3,1 so 24=2*2*2*3, 74= 2*2*2*3*3, we added and calculated 24 as HCF, this is the way we did in our childhood   so our HCF or GCD in this case of 24 and 74, will be 24 so basically what is GCD, one factor which is maximum and can divide both the numbers perfectly and give remainder 0 this is GCD, what are we going to learn in this? It is very simple there is one algorithm Euclid algorithm we are going to study about that, what is this algorithm? according to this algorithm GCD(a,b) can be calculated by GCD(a-b,b) this is formula, we can use this and find GCD if I improvise a bit, than we can write it as, gcd(a%b,b) understood? now you know two ways to find gcd you can easily see this solve I can explain it you in a very simple way by using recursion, but the problem is that still I have taught you recursion, we will study it later so will not do it by recursion, right now we will solve it with iteration understand carefully what is the code, this logic first tell me what is the proof for this? how will I come to know how this formula has derived? I will say there is no need to know that, we have to believe that this is the formula and if we have to prove than, prove it by induction OK we are not going to play proof proof we know the formula, if we wish to prove, you have studied mathematical induction, may be 11th class so you can use that and prove there is no problem it will be done OK, so if you want I will add the link for proof no problem in that now we know the formula, I can use it and fine GCD these HCF LCM questions are frequent, so if yo know the formula you can solve it, otherwise you will not be able to do it know you know the formula, so you know that I have to find the GCD until any one parameter is not 0 until then I have to apply this formula as I had done find GCD of 72 and 24, it is simple I will calculate it, gcd(48,24), again I will apply the formula gcd(24,24) now gcd(0,24), we got 0, so this is the answer this way you have to calculate it when one element will be 0, the remaining one will be the answer it was simple there was no rocket science so we had to do it this way and you have understood it done? now let us move ahead I will show you the code which is already done we will go to gcd.cpp we  took 2 numbers as input,  a and b and stored it into int ans=gcd(a,b);I have created the function and printed the answer that gcd of a and b is this we are going above, what we have done is if a=0, then b is the answer, we have seen if anyone number is 0 second one is the answer if a=0 then answer=b, and if b=0 then answer=a but if none of them is 0 then? we will make one of them 0 how we will do it, let us see once we said that until they are not equal till than just keep on subtracting bigger number from smaller number if a is greater then do a-b, otherwise do b-a understood? you are given 2 numbers, which ever is greater, you have to subtract the smaller one and keep on executing this function as we had seen 72 was greater, so we did 72-24=48 48-24=24-24=0, other element is our answer so if you want to study in depth about gcd, then I am giving you a link in the description you can read it, it will hardly take 5 minutes you will become a champ in gcd in 5 minutes and I will tell you one more formula, that is, you have learned one formula suppose you want relation with LCM, how LCM and GCD are related it is simple I said LCM(a,b)* gcd(a,b)=a*b very good, you can use this relation also to solve your question LCM*HCF=product of 2 numbers simple, this way we have coded this was it very hard?not at all OK, so now you understood, how you can do it an iterative way after you will say recursively, you will say the code is so easy then why did you teach us the iterative way you should have taught recursive way only we will learn that also, when we will learn recursion we will learn that also OK, so we have understood how to calculate gcd, any one element is 0 than second element is the answer if a=0, than answer=b. If b=0, than answer=a, or else subtract the smaller number from the greater number nothing else, finish! done, you have to do this much, it was so simple now we have also understood the code of gcd, this is also done now, we will move on to the next topic which is fast power and modular arithmetic we will talk about this one time OK, modulo i.e. % operator suppose I do a%n, then answer will be 0 to n-1 included OK, this we have already done, we already have knowledge of % operator but what is the property, how can we follow that, for that I have attached a resource see this now we will come back to Modular Arithmetic, if you want to understand, there is one article of codeforces I will show it to you see this, you have to read this article by yourself it is for beginners, and not so difficult you will get many things inside this, Fermat's theorem, Luca's theorem, do not worry about that, what ever you can understand you read that much, and leave the remaining part remaining we are discussing what did I say, let us see the basic properties you can see properties over here let us understand them, you might have seen in some competitive questions print your answer in the form of ans%10 to power of 9+7, is it like this you are said that print, ans modulo 10 to the power 9 +7, this way why is it given? suppose, I want to find a factorial and I am not using long, I am only using int and I want to find factorial of 20 I will not be able to calculate it, it will overflow so it will overflow, in such case to save overflow use MOD, what ever answer you are getting answer as 20 then it will be 20 modulo 10 to the power of 9+7 the answer which you have got, by using MOD it will come into a range and you will be saved from overflow done, understood? now, we will understand what all properties are given here we are said that (a+b)%m= a%m + b%m understood? you can write like this, a%m - b%m can be written as (a-b)%m done, if you start writing like (a%m)%m)%m there is no difference, yu will get the same answer write in once only, not need to be a hero what is the next one, what is the next question a%m * b%m= (a*b)%m, it is the same thing you are given some properties and formulas you can use them how will you use them? I am going to teach you fast exponentiation after that you will be a champ we will use it in that let us apply it and see how does it work read this article one time, try to understand, whatever you can understand is good but read it, do not leave it now we will read one thing, fast exponentiation what is this? we had written one function for power, before some time, nearly before 10 lectures what we had done in that, we had to find a to the power of b we had made a result, which was initialized 1 and we were executing a loop b times and in that loop we did result=result*a this way, what was the complexity O(b) this is your time complexity this we had done OK, so can I do it in less time complexity? I said yes, that is why I am telling this thing as fast let us try to understand it and move ahead so we will understand the logic, what I have to do is I have to calculate a to the power b suppose I have to calculate 2 to the power of 10 or 2 to the power of 11 something like this I will say it is very easy, suppose we have I have a to the power b I can represent it in 2 ways, 1st one, a to the power (b/2)2 if b is even a to the power (b/2)2 *a, if b is odd for example how can I write 2 to the power 10 2 to the power of 5 square or if 2 to the power 11 I can do it like this 2 to the power 5 square * 2 understood? if it is even, we just have to square and if it is odd, square it and again multiply it understood? now we have to code this if we had to it using recursion , then it would have been s smooth, but I have not taught you recursion, I will teach you, so right now we have to do by alternative way, and try to understand let us see the question one time what is the question? question is that you are given 3 things x,n and m you have to find x to the power of n modulo m I will explain it to you you are given x,n, and m you have to find x to the power n modulo m,like this and done, it is so simple so what you can understand over here, if I will go in normal way to find the power, I will have complexity of O(n) so in the fast exponentiation way, which we recently saw, odd and even case in this the complexity will be O(log n) which time complexity is good? I said this one is good fast exponentiation one so we will solve with this, code is also easy so what did we say, it easy, solve it fast we said, int res=1;  while(n>0) { if(n&1) {// odd res=res*a;} a=a*a; b= b>>1;} why have we done divide by 2 in bit, divide and % are expensive, when you do it with bit they become less expensive it will be optimal, so use bit, instead of divide by to right shift>> 1 is better remember what happens with right shift? if you >>1 it is divided by 2 you should remember this this much you have done after that you came out and, return res; is this correct, we will run it we will run it one time, there is an error, it is telling what is a I was thinking about a and b, a is x, b is n, now we will run what happened, all answers are wrong, very good we also had to %, we will do % so write it this way, res=((res)%m*(x)%m)%m; x=((x)%m * (x)%m)%m; now we will run it and see still there is 1 mistake what is the mistake, let's think once where are we making mistake? we will see the logic once what we have done, we have done this number % m, now it will be in range total also we have done %m so it will also be in range, so your result will also be in %m so result is in %, so there was no need to do it again we need not do this with out this only our test case will pass fine, then we saw x, we did %m to x, and did the result also %m now, let us see the constraint one time x can be in 10 to the power 9, very good so in this case, this can be done, that these both are extreme case may be the product over here will go out of the range of int so I will have to save it in long so, res=(1LL*(res)*(x)%m)%m; I did type casting I did type cast, and run the code everything is pass so  I submitted it fine, we know that integer is of 32 bit 32 bit i.e 2 to the power 31 i.e. 10 to the power 9, and over here if 2 number of 10 to the power 9 are being multiplied, then the power will 18, and long long will handle this so we type caste it with Long Long fine, we will again understand this code is executed, see the submission we have got the correct answer we will just understand the logic one more time we have made result or answer, we have checked while(n>0) if it is odd, result*x, then we applied %m everywhere because we have see property of % so we had applied accordingly even if yo will apply excessive then also there is no problem OK, then we type cast it we came down, we multiplied x 2 times, we had to find x square we applied %m , what difference does it make and applied 1LL  we had to divide by 2 the exponent, so we divided it by 2, doing byte shift by 1 and we returned the answer so this way we taught you the fast exponentiation game also we also cleared all the test case, so you have understood this thing now what we have learned up to now? we have learned " Seive of Eratosthenes", an I have given you homework to see segmented sieve one time then we have learned GCD and its formula, and we also saw the relation between GCD and LCM after that we saw fast power and how to write its code while doing this we have also seen a bit of modular arithmetic, how it is I have shared one article on GCD, you have to read it I have also shared an article on modular arithmetic, that also you have to read OK, so what else do we have for homework? these were the hot topics, which come frequently I say you that there are some other topics also which are asked sometimes if you will do it, it will be beneficial for you what are those topics, I will write them down in homework for you you have to read them once spare some time and read them like pigeon hole principle it is easy, if you will solve 3-4 question you will understand, it is not that difficult than catalon number, it is a series, not very difficult, it will hardly take 5 minutes you also have to see its real life application, there is an MCQ in tree, in binary search tree, we will teach you when we will learn tree after that you have to read inclusion exclusion principle you have to do these three things, now you also have to solve one question, factorial of a number this we have already done we have done it by using int, but if we will find factorial of 12, integer will overflow suppose you want to find factorial of 212, we have to find using %m how will you find it? you have to find factorial of a big number, by using %m, value of m is 10 to the power 9 +7 find factorial of 212, and print it in the output factorial of 212%m m is 10 to the power 9 + 7 you have to solve this question, if you will solve this many concepts will be clear so today there is a lot of homework, you keep on saying that I am giving less home work now a days, so I have given you a lot of homework so you have to do this homework, fine? and which ever questions we do, find complexity of each one of them and tell me the complexity and then I will come to know that students are studying and this much only for this video we have left many topics, which? all the questions left will be taught when there will be need of them,I will definitely teach if there is a need, I will not deny after going further if I feel that these questions need to be taught, students should know I have to teach Euler's function.  I have to teach all these things, whenever the topic is required it will taught at that time I do not want to forcefully teach just to show off, what ever is needed, which will help in placement that will be taught I will not teach even one word extra I am again making it clear that the intention of the course is that I can help you in placement, nothing more or less then that OK, so have trust what ever I am teaching keep on doing, keep solving questions on LeetCode along with that I have given you 2 articles to read, read them  I have given questions to solve, solve them read 3 concepts, and tell me comment section, you are enjoying it or not I will tell you the time, I am working hard and I am also showing it to you time is 4:56 a.m, I am shooting, and today's date is 21st, so I will edit this video and you will get it by morning when I am working hard in teaching, you should also work hard in learning I do not even have any hope, that any student might be watching the video till here, if you are watching then, tell me that I had watched video till here I will be surprised Does any student watch video till the end, do students really study so this much only for this video, see you in next video, till then bye bye, tata, see you! It was basic maths, there are many concepts, I know that I will  definitely teach if required, we will not run away, I told I will teach you, so don't worry. Ok, bye bye`


//     Open Source Portfolio Guide 2023 for High-Pay Jobs | Does It Really Matter?
// •Do contributions really matter? No, it doesn't matter for a few reasons.
// •Quality matters more than quantity when contributing.
// •Spend time understanding the project in depth.
// •Get a mentor who is currently working in the industry.
// •Focus on learning the right things.
// •Don't chase the outcome of a green open source graph, focus on learning.
// •The transition from no contributions to many contributions is natural and organic.