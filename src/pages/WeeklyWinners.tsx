@@ .. @@
         {/* Summary Stats */}
-        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
-          <Card className="clean-card animate-slide-up">
+        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
+          <div className="stats-card-glow-white text-center animate-slide-up p-6">
             <CardContent className="p-6 text-center">
-              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
+              <Users className="h-8 w-8 text-primary mx-auto mb-2 icon-glow-primary" />
               <p className="text-2xl font-bold text-primary">{filteredWinners.length}</p>
               <p className="text-sm text-muted-foreground">Total Winners</p>
             </CardContent>
-          </Card>
-          <Card className="stats-card-orange animate-slide-up" style={{ animationDelay: '0.1s' }}>
+          </div>
+          <div className="stats-card-orange-glow animate-slide-up p-6 text-center" style={{ animationDelay: '0.1s' }}>
             <CardContent className="p-6 text-center">
-              <Calendar className="h-8 w-8 text-white mx-auto mb-2" />
+              <Calendar className="h-8 w-8 text-white mx-auto mb-2 icon-glow-white" />
               <p className="text-2xl font-bold">{weeks.length}</p>
               <p className="text-sm text-white/90">Weeks</p>
             </CardContent>
-          </Card>
-          <Card className="clean-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
+          </div>
+          <div className="stats-card-glow-white text-center animate-slide-up p-6" style={{ animationDelay: '0.2s' }}>
             <CardContent className="p-6 text-center">
-              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
+              <Target className="h-8 w-8 text-primary mx-auto mb-2 icon-glow-primary" />
               <p className="text-2xl font-bold text-primary">{activities.length}</p>
               <p className="text-sm text-muted-foreground">Activities</p>
             </CardContent>
-          </Card>
-          <Card className="stats-card-navy animate-slide-up" style={{ animationDelay: '0.3s' }}>
+          </div>
+          <div className="stats-card-navy-glow animate-slide-up p-6 text-center" style={{ animationDelay: '0.3s' }}>
             <CardContent className="p-6 text-center">
-              <Trophy className="h-8 w-8 text-white mx-auto mb-2" />
+              <Trophy className="h-8 w-8 text-white mx-auto mb-2 icon-glow-white" />
               <p className="text-2xl font-bold">{filteredWinners.filter(w => w.position === 1).length}</p>
               <p className="text-sm text-white/90">Champions</p>
             </CardContent>
-          </Card>
+          </div>
         </div>