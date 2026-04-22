// Sample usage of MotionTokens in a Flutter app.
// To run this you need the Flutter SDK installed and a project created
// with `flutter create`. Copy lib/motion_tokens.dart into your project
// and use the tokens like this screen does.

import 'package:flutter/material.dart';
import '../lib/motion_tokens.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Motion tokens demo',
      home: DemoScreen(),
    );
  }
}

class DemoScreen extends StatefulWidget {
  const DemoScreen({super.key});

  @override
  State<DemoScreen> createState() => _DemoScreenState();
}

class _DemoScreenState extends State<DemoScreen> {
  bool expanded = false;
  bool visible = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Motion tokens')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('AnimatedContainer with MotionTokens.durationNormal + easeOut'),
            const SizedBox(height: 12),
            // Same piece as the snippet in the book.
            AnimatedContainer(
              duration: MotionTokens.durationNormal,
              curve: MotionTokens.easeOut,
              width: expanded ? 240 : 120,
              height: expanded ? 120 : 80,
              decoration: BoxDecoration(
                color: Colors.indigo,
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => setState(() => expanded = !expanded),
              child: Text(expanded ? 'Shrink' : 'Expand'),
            ),
            const SizedBox(height: 32),

            const Text('AnimatedOpacity with MotionTokens.durationSlow + easeEmphasized'),
            const SizedBox(height: 12),
            AnimatedOpacity(
              opacity: visible ? 1 : 0,
              duration: MotionTokens.durationSlow,
              curve: MotionTokens.easeEmphasized,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.green.shade100,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Text('Success confirmation'),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => setState(() => visible = !visible),
              child: Text(visible ? 'Hide' : 'Show'),
            ),
          ],
        ),
      ),
    );
  }
}
