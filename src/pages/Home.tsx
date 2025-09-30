@@ .. @@
       {/* Hero Section */}
-      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden hero-gradient">
+      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
+        {/* Enhanced Background with Glow Effects */}
+        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary">
+          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-accent/20"></div>
+          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-soft"></div>
+          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float-gentle"></div>
+          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/40 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
+        </div>
+
         {/* Background Image */}
-        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-blue-600/90 to-primary/90">
+        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-blue-600/80 to-primary/80">
           <img 
             src="https://ik.imagekit.io/lhb4hvprkpz/img8_7aJkuzpeF.jpg?updatedAt=1627472961687" 
             alt="Students collaborating" 
-            className="w-full h-full object-cover mix-blend-overlay opacity-30"
+            className="w-full h-full object-cover mix-blend-overlay opacity-20"
           />
         </div>

         {/* Main Content */}
-        <div className="relative z-10 text-center text-white px-4">
+        <div className="relative z-10 text-center text-white px-4 hero-content-glow">
           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
-            <span className="text-orange-500">ADITYA</span> <span className="text-blue-200">UNIVERSITY</span>
+            <span className="text-accent drop-shadow-2xl hero-text-glow">ADITYA</span> <span className="text-white drop-shadow-2xl hero-text-glow">UNIVERSITY</span>
           </h1>

-          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
+          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 opacity-95 animate-slide-up hero-subtitle-glow" style={{ animationDelay: '0.2s' }}>
             Department of Computer Science and Engineering
             <br />
             SABL Activities
           </h2>
-          <p className="text-base sm:text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
+          <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-up hero-description-glow" style={{ animationDelay: '0.4s' }}>
             Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
           </p>
           <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
-            <Button size="lg" asChild className="btn-orange-accent">
+            <Button size="lg" asChild className="btn-orange-accent hero-cta-glow">
               <Link to="/upcoming">
                 Explore Activities
                 <ArrowRight className="ml-2 h-5 w-5" />
@@ .. @@
       {/* This Week's Winners Section */}
-      <section className="section-clean">
+      <section className="section-clean relative overflow-hidden">
+        {/* Section Background Glow */}
+        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-primary/10 rounded-full blur-3xl"></div>
+        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
+        
         <div className="container mx-auto">
-          <div className="text-center mb-12 animate-slide-up">
+          <div className="text-center mb-12 animate-slide-up relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
               🏆 Top Performers of the Week
             </h2>
@@ .. @@
       {/* Statistics Section */}
-      <section className="section-clean bg-gray-50">
+      <section className="section-clean relative overflow-hidden">
+        {/* Enhanced Background with Multiple Glow Effects */}
+        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>
+        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-gentle"></div>
+        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-soft"></div>
+        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/20 rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '2s' }}></div>
+        
         <div className="container mx-auto">
-          <div className="stats-card-navy rounded-2xl p-8 md:p-12 text-white animate-slide-up shadow-elevated">
+          <div className="stats-card-navy-enhanced rounded-3xl p-8 md:p-12 text-white animate-slide-up shadow-elevated relative z-10 overflow-hidden">
+            {/* Card Internal Glow Effects */}
+            <div className="absolute top-0 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
+            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
+            
             <div className="text-center mb-8">
-              <h2 className="text-3xl md:text-4xl font-bold mb-4">SABL Impact</h2>
-              <p className="text-lg opacity-90">Measuring our success through student engagement and achievements</p>
+              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10 stats-title-glow">SABL Impact</h2>
+              <p className="text-lg opacity-95 relative z-10">Measuring our success through student engagement and achievements</p>
             </div>

-            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
+            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
               <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
-                <div className="text-4xl font-bold mb-2">10+</div>
-                <div className="text-sm opacity-80">Events Conducted</div>
+                <div className="text-4xl font-bold mb-2 stats-number-glow">10+</div>
+                <div className="text-sm opacity-90">Events Conducted</div>
               </div>
               <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
-                <div className="text-4xl font-bold mb-2">600+</div>
-                <div className="text-sm opacity-80">Student Participants</div>
+                <div className="text-4xl font-bold mb-2 stats-number-glow">600+</div>
+                <div className="text-sm opacity-90">Student Participants</div>
               </div>
               <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
-                <div className="text-4xl font-bold mb-2">60+</div>
-                <div className="text-sm opacity-80">Winners Celebrated</div>
+                <div className="text-4xl font-bold mb-2 stats-number-glow">60+</div>
+                <div className="text-sm opacity-90">Winners Celebrated</div>
               </div>
               <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
-                <div className="text-4xl font-bold mb-2">25+</div>
-                <div className="text-sm opacity-80">Industry Partners</div>
+                <div className="text-4xl font-bold mb-2 stats-number-glow">25+</div>
+                <div className="text-sm opacity-90">Industry Partners</div>
               </div>
             </div>
           </div>
@@ .. @@
       {/* Quick Navigation Section */}
-      <section className="section-clean">
+      <section className="section-clean relative overflow-hidden">
+        {/* Section Background Glow */}
+        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft"></div>
+        <div className="absolute bottom-0 right-1/2 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-float-gentle"></div>
+        
         <div className="container mx-auto">
-          <div className="text-center mb-12 animate-slide-up">
+          <div className="text-center mb-12 animate-slide-up relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
               Quick Navigation
             </h2>
@@ .. @@
           
-          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
+          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
             <Link to="/upcoming" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
-              <div className="clean-card clean-card-hover p-8 text-center border-primary/20 group-hover:border-primary/40 transition-all duration-300">
-                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110">
+              <div className="navigation-card-glow p-8 text-center transition-all duration-300 group-hover:scale-105">
+                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 icon-glow-primary">
                   <Calendar className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-xl font-semibold text-primary mb-2">Upcoming Activities</h3>
@@ .. @@
             
             <Link to="/previous" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
-              <div className="clean-card clean-card-hover p-8 text-center border-primary/20 group-hover:border-primary/40 transition-all duration-300">
-                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110">
+              <div className="navigation-card-glow p-8 text-center transition-all duration-300 group-hover:scale-105">
+                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 icon-glow-primary">
                   <History className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-xl font-semibold text-primary mb-2">Previous Activities</h3>
@@ .. @@
             
             <Link to="/winners" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
-              <div className="clean-card clean-card-hover p-8 text-center border-primary/20 group-hover:border-primary/40 transition-all duration-300">
-                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110">
+              <div className="navigation-card-glow p-8 text-center transition-all duration-300 group-hover:scale-105">
+                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 icon-glow-primary">
                   <Trophy className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-xl font-semibold text-primary mb-2">Hall of Fame</h3>