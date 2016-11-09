@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 m4 offset-m4">
                <div class="panel panel-default">
                    <div class="panel-heading">Password set</div>

                    <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/password/set') }}">
                            {{ csrf_field() }}
                            <input type="hidden" name="password_token" value="{{ $password_token }}">

                            @if ($errors->has('password_token'))
                                <span class="help-block">
                                        <strong>{{ $errors->first('password_token') }}</strong>
                                    </span>
                            @endif

                            <div class="input-field form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                <label for="password" class="col-md-4 control-label">Password</label>
                                <input id="password" type="password" class="form-control" name="password">
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="input-field form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                                <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
                                <input id="password-confirm" type="password" class="form-control"
                                       name="password_confirmation">

                                @if ($errors->has('password_confirmation'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
